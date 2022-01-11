<template>
    <div>
        -- recursive-renderer --
        <!-- {{ cmsContent }} -->
        <template v-for="content in cmsContent.body" :key="content._uid">
            -- render {{ content.component }} --
            <component :is="content.component" :cmsContent="content"></component>
        </template>
    </div>
</template>
<script lang="ts" src="./RecursiveRenderer.ts" />
<style scoped lang="scss" src="./_recursive-renderer.scss" />
