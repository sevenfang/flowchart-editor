<!--
 * @description     编辑面板条目
 *
 * @author          重阳
 * @create          2019-10-16 11:00
-->
<template>
    <div class="card-item">
        <div class="header" @click="handleToggle">
            <div :class="{ 'title': true, 'bold': bold }" v-if="title">{{ title }}</div>
            <div class="handler" v-if="enableFold">
                <i class="el-icon-arrow-up" v-show="!isFolded"></i>
                <i class="el-icon-arrow-down" v-show="isFolded"></i>
            </div>
        </div>
        <div class="body" v-show="!isFolded">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'CardItem',
    props: {
        title: String,
        // 支持折叠
        enableFold: {
            type: Boolean,
            default: false
        },
        // 默认是否折叠
        fold: {
            type: Boolean,
            default: false
        },
        // 标题加粗
        bold: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            // 是否已折叠
            isFolded: false
        }
    },
    watch: {
        fold: function(val, newVal) {
            let _t = this
            if (_t.enableFold) {
                _t.isFolded = newVal
            }
        }
    },
    methods: {
        handleToggle: function() {
            let _t = this
            if (!_t.enableFold) {
                return
            }
            // 处理面板折叠
            _t.isFolded = !_t.isFolded
        }
    }
}
</script>
<style scoped lang="scss">
.card-item {
    display: inline-block;
    width: 100%;
    /*height: 200px;*/
    position: relative;
    border-top: 1px solid rgba(0, 0, 0, .1);
    border-bottom: 1px solid rgba(0, 0, 0, .1);

    .header {
        display: inline-block;
        width: 100%;
        position: relative;

        .title {
            width: 100%;
            height: 30px;
            line-height: 30px;
            border-bottom: 1px solid rgba(0, 0, 0, .1);
            text-indent: 10px;
            color: #000;

            &.bold {
                font-weight: 800;
            }
        }

        .handler {
            position: absolute;
            right: 10px;
            top: 3px;
            z-index: 10;
            cursor: pointer;
        }
    }

    .body {
        display: inline-block;
        width: 100%;
    }
}
</style>