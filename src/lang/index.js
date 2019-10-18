
import _en from 'element-ui/lib/locale/lang/en' // element-ui lang
import _zh from 'element-ui/lib/locale/lang/zh-CN' // element-ui lang

// 导入系统语言包
import zh from './zh-CN'
import en from './en-US'

import VueI18n from 'vue-i18n'
// import locale from 'iview/src/locale/index'
import * as Cookies from 'js-cookie'
import config from '../config'

export default function (Vue) {
    let langs = {
        label: {
            'zh-CN': '简体中文',
            'en-US': 'English'
        },
        icon: {
            'zh-CN': require('@/assets/images/langs/zh-CN.png'),
            'en-US': require('@/assets/images/langs/en-US.png')
        },
        data: {
            'zh-CN': { ..._zh, ...zh },
            'en-US': { ..._en, ...en }
        }
    }


    let key = config.cookie.getItem('locale')
    let val = Cookies.get(key)

        let keys = Object.keys(langs.label)
    var defLang = val || keys[0]

    // 注册插件
    Vue.use(VueI18n)
    Vue.locale = () => {}
    // 全局挂载语言包key
    Vue.prototype.$X.langs = langs
    Vue.prototype.$X.locale = defLang
    // i18n实例
    let i18nInstance = new VueI18n({
        locale: defLang,
        messages: langs.data
    })
    // // FIXME 覆写iview i18n方法，修复$Modal弹窗报错BUG，【Issues】https://github.com/iview/iview/issues/4769#issuecomment-449851416
    // locale.i18n((path, options) => i18nInstance.t(path, options))
    Vue.prototype._i18n = i18nInstance
    return i18nInstance
}