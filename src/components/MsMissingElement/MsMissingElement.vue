<template>
    <div :data-component="$options.name" class="p-5 border border-dotted border-red-700">
        <h3 class="mb-10">{{ cmsContent.name }} | {{ cmsContent.label }} | {{ cmsContent.cmsId }}</h3>
        <template v-for="child in cmsContent.children" :key="child.cmsId">
            <component :is="selectComponent(child)" :cmsContent="child"></component>
        </template>
    </div>
</template>
<script lang="ts" src="./MsMissingElement.ts" />
<style scoped lang="scss" src="./_ms-missing-element.scss" />
