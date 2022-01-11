<template>
    <div :data-component="$options.name">
        -- defaultView --
        <recursive-renderer :cmsContent="content"></recursive-renderer>
    </div>
</template>
<script lang="ts" src="./DefaultView.ts" />
<style scoped lang="scss" src="./_default-view.scss" />
