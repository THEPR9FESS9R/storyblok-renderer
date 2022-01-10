import enquirer from 'enquirer'
import { readFileSync, writeFileSync, existsSync, mkdirSync, rmdirSync } from 'fs'
import camelCase from 'lodash-es/camelCase.js'
import kebabCase from 'lodash-es/kebabCase.js'
import startCase from 'lodash-es/startCase.js'
import { relative, resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const PAGE_STRUCTURE_MARKER = /{{PAGE_STRUCTURE_PATH}}/g
const SERVICE_DATA_PROVIDER_MARKER = /{{SERVICE_DATA_PROVIDER}}/g
const COMPONENT_NAME_MARKER = /{{COMPONENT_NAME}}/g
const MS_TEST_UTILS_MARKER = /{{MS_TEST_UTILS}}/g
const HTTP_STATUS_MARKER = /{{HTTP_STATUS_PATH}}/g
const CHANNEL_NAME = /{{CHANNEL_NAME}}/g

const templates = {
    scss: resolve(__dirname, '../', './templates/template.scss'),
    storybook: resolve(__dirname, '../', './templates/template.stories.ts'),
    ts: resolve(__dirname, '../', './templates/template.ts'),
    spec: resolve(__dirname, '../', './templates/template.spec.ts'),
    vue: resolve(__dirname, '../', './templates/template.vue'),
    service: resolve(__dirname, '../', './templates/template.service.ts'),
    serviceSpec: resolve(__dirname, '../', './templates/template.service.spec.ts'),
    redirect: resolve(__dirname, '../', './templates/template.redirect.ts'),
    redirectSpec: resolve(__dirname, '../', './templates/template.redirect.spec.ts'),
}

const defaultPaths = {
    M: resolve(process.cwd(), './src/cmsElements/M'),
    E: resolve(process.cwd(), './src/cmsElements/E'),
    Component: resolve(process.cwd(), './src/components'),
    S: resolve(process.cwd(), './src/cmsElements/S'),
}

const pathPrompt = new enquirer.Input({
    message: 'Define custom Path (relative to root)',
})

const moduleNamePrompt = new enquirer.Input({
    message: 'Name of Element?',
})

const moduleTypePrompt = new enquirer.Select({
    name: 'moduleName',
    message: 'Type of Element',
    choices: Object.keys(defaultPaths),
})

function writeTsFile(path, name) {
    const pageStructureRelativePath = createRelativeImport(path, './src/interfaces/pageStructure')
    let fileContent = readFileSync(templates.ts, 'utf-8')

    fileContent = fileContent.replace(PAGE_STRUCTURE_MARKER, pageStructureRelativePath)
    fileContent = fileContent.replace(COMPONENT_NAME_MARKER, name)

    writeFileSync(`${path}/${moduleName}.ts`, fileContent)
}

function writeServiceFile(path, name) {
    const pascalCaseName = startCase(camelCase(`${name}ServiceData`)).replace(/ /g, '')
    const serviceDataProviderRelativePath = createRelativeImport(path, './src/engine/provider/serviceDataProvider')
    let fileContent = readFileSync(templates.service, 'utf-8')

    fileContent = fileContent.replace(SERVICE_DATA_PROVIDER_MARKER, serviceDataProviderRelativePath)
    fileContent = fileContent.replace(COMPONENT_NAME_MARKER, name)
    fileContent = fileContent.replace(/ComponentNameServiceData/g, pascalCaseName)

    writeFileSync(`${path}/${moduleName}.service.ts`, fileContent)
}

function writeRedirectFile(path, name) {
    const pageStructureRelativePath = createRelativeImport(path, './src/engine/interfaces/pageStructure')
    const componentCapabilitiesRelativePath = createRelativeImport(
        path,
        './src/engine/interfaces/componentCapabilities',
    )
    const httpStatusRelativePath = createRelativeImport(path, './src/engine/response/httpStatus')
    let fileContent = readFileSync(templates.redirect, 'utf-8')

    fileContent = fileContent.replace(/{{CAPABILITIES_PATH}}/g, componentCapabilitiesRelativePath)
    fileContent = fileContent.replace(HTTP_STATUS_MARKER, httpStatusRelativePath)
    fileContent = fileContent.replace(PAGE_STRUCTURE_MARKER, pageStructureRelativePath)
    fileContent = fileContent.replace(COMPONENT_NAME_MARKER, name)

    writeFileSync(`${path}/${moduleName}.redirect.ts`, fileContent)
}

function writeRedirectSpecFile(path, name) {
    const httpStatusRelativePath = createRelativeImport(createTestPath(path), './src/engine/response/httpStatus')
    let fileContent = readFileSync(templates.redirectSpec, 'utf-8')

    fileContent = fileContent.replace(HTTP_STATUS_MARKER, httpStatusRelativePath)
    fileContent = fileContent.replace(MS_TEST_UTILS_MARKER, getMsTestUtilsPath(createTestPath(path)))
    fileContent = fileContent.replace(COMPONENT_NAME_MARKER, name)

    writeFileSync(`${createTestPath(path)}/${moduleName}.redirect.spec.ts`, fileContent)
}

function createTestPath(path) {
    return resolve(path, './__tests__')
}

function writeServiceSpecFile(path, name) {
    const serviceDataProviderRelativePath = createRelativeImport(
        createTestPath(path),
        './src/engine/provider/serviceDataProvider',
    )
    let fileContent = readFileSync(templates.serviceSpec, 'utf-8')

    fileContent = fileContent.replace(SERVICE_DATA_PROVIDER_MARKER, serviceDataProviderRelativePath)
    fileContent = fileContent.replace(COMPONENT_NAME_MARKER, name)
    fileContent = fileContent.replace(MS_TEST_UTILS_MARKER, getMsTestUtilsPath(createTestPath(path)))

    writeFileSync(`${createTestPath(path)}/${moduleName}.service.spec.ts`, fileContent)
}

function writeTsSpecFile(path, name) {
    let fileContent = readFileSync(templates.spec, 'utf-8')

    fileContent = fileContent.replace(COMPONENT_NAME_MARKER, name)

    writeFileSync(`${createTestPath(path)}/${name}.spec.ts`, fileContent)
}

async function writeVueFile(path, name) {
    const SCSS_IMPORT_MARKER = /{{ SCSS_IMPORT }}/g
    const SCSS_IMPORT_TEMPLATE = '<style scoped lang="scss" src="./{{SCSS_FILE_NAME}}" />'
    let fileContent = readFileSync(templates.vue, 'utf-8')

    fileContent = fileContent.replace(COMPONENT_NAME_MARKER, name)
    fileContent = fileContent.replace(/{{CLASS}}/g, createScssClass(name))

    // const addScss = await confirmPrompt('scss', 'Add SCSS?')
    // if (addScss) {
    const scssImport = SCSS_IMPORT_TEMPLATE.replace(/{{SCSS_FILE_NAME}}/g, createScssFileName(name))
    fileContent = fileContent.replace(SCSS_IMPORT_MARKER, scssImport)
    writeFileSync(`${path}/${createScssFileName(name)}`, '')
    // } else {
    //     fileContent = fileContent.replace(SCSS_IMPORT_MARKER, '')
    // }

    writeFileSync(`${path}/${name}.vue`, fileContent)
    return Promise.resolve()
}

function createStoryPath(type) {
    if (isComponent(type)) {
        return 'Components'
    } else {
        return `CMS/${type}`
    }
}

function writeStoryFile(path, name, type) {
    const COMPONENT_TAG_MARKER = /{{COMPONENT_TAG}}/g
    let fileContent = readFileSync(templates.storybook, 'utf-8')

    fileContent = fileContent.replace(COMPONENT_NAME_MARKER, name)
    fileContent = fileContent.replace(/{{COMPONENT_TYPE}}/g, createStoryPath(type))
    fileContent = fileContent.replace(/{{CHANNEL_NAME}}/g, process.env.CHANNEL_NAME)

    if (isComponent(type)) {
        fileContent = fileContent.replace(COMPONENT_TAG_MARKER, kebabCase(name))
    } else {
        fileContent = fileContent.replace(COMPONENT_TAG_MARKER, name)
    }

    writeFileSync(`${path}/${moduleName}.stories.ts`, fileContent)
}

function createScssClass(name) {
    return kebabCase(name)
}

function createScssFileName(name) {
    return `_${createScssClass(name)}.scss`
}

async function createDirectory(path) {
    if (existsSync(path)) {
        const shouldOverwrite = await confirmPrompt('question', 'Overwrite directory?')

        if (shouldOverwrite) {
            rmdirSync(path, { recursive: true })
        } else {
            process.exit(0)
        }
    }
    mkdirSync(`${path}/__tests__`, { recursive: true })
    return Promise.resolve()
}

function isComponent(type) {
    return type === 'Component'
}

function confirmPrompt(name, message) {
    return new enquirer.Confirm({
        name,
        message,
    }).run()
}

async function checkModuleName(name, type) {
    if (!/^(M_|E_|S_|Ms)/.test(name)) {
        const prefix = isComponent(type) ? 'Ms' : `${type}_`
        const shouldRename = await confirmPrompt('rename', `Component will be renamed to ${prefix + name}`)

        if (shouldRename) {
            return Promise.resolve(prefix + name)
        }
    }

    return Promise.resolve(name)
}

function createRelativeImport(from, to) {
    // if (!process.cwd().includes('sunrise-core')) {
    //     return to.replace('.', '@meinestadt/sunrise')
    // }

    return relative(from, to)
}

const moduleType = await moduleTypePrompt.run()
let moduleName = await moduleNamePrompt.run()
moduleName = await checkModuleName(moduleName, moduleType)

const isDefaultPath = await confirmPrompt('service', 'Use default paths?')
let finalPath = resolve(defaultPaths[moduleType], moduleName)
if (!isDefaultPath) {
    const customPath = await pathPrompt.run()
    finalPath = resolve(customPath, moduleName)
}

await createDirectory(finalPath)
writeTsFile(finalPath, moduleName)
// writeTsSpecFile(finalPath, moduleName)
await writeVueFile(finalPath, moduleName)

// const addStorybook = await confirmPrompt('story', 'Add storybook?')
// if (addStorybook) {
//     writeStoryFile(finalPath, moduleName, moduleType)
// }

// if (!isComponent(moduleType)) {
//     const addService = await confirmPrompt('service', 'Add service provider?')
//     if (addService) {
//         writeServiceFile(finalPath, moduleName)
//         writeServiceSpecFile(finalPath, moduleName)
//     }

//     const addRedirect = await confirmPrompt('redirect', 'Add redirect provider?')
//     if (addRedirect) {
//         writeRedirectFile(finalPath, moduleName)
//         writeRedirectSpecFile(finalPath, moduleName)
//     }
// }

function getMsTestUtilsPath(path) {
    return createRelativeImport(path, './src/__mocks__/msTestUtils')
}
