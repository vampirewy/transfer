/**
 * @Author: jrucker
 * @Description 用于将css/js脚本注入到HtmlWebpackPlugin中
 * @Date: 2020/8/19 19:06
 * @Last Modified by: jrucker
 * @Last Modified time: 2020/8/19 19:06
 */

module.exports = class InsertScriptPlugin {
    constructor(options) {
        this.script = options.script;
        this.PLUGIN_NAME = 'HtmlWebpackEventPlugin';
    }

    // 注入脚本至HtmlWebpackEventPlugin中
    apply(compiler) {
        let that = this;

        if (compiler.hooks) {
            compiler.hooks.compilation.tap(this.PLUGIN_NAME, function (compilation) {
                compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync(that.PLUGIN_NAME, function (data, cb) {
                    let assets = data.assets;
                    let {css, js} = assets;
                    let plugin = data.plugin;
                    let {name} = plugin.options;

                    let conf = that.script.find(item => item.name === name);

                    that.setScript(conf, 'css', css);
                    that.setScript(conf, 'js', js);

                    if (conf.injectArgument) {
                        data.html = data.html.toString().split('</body>')[0] + conf.injectArgument();
                    }

                    cb(null, data)
                });
            })
        }
    }

    // 获取script数据
    setScript(conf, name, value) {
        conf.script[name].map(path => {
            let includes = path.includes('[hash]');

            if (includes) {
                let str = path.replace('[hash]', new Date().getTime());
                value.unshift(str)
            } else {
                value.unshift(path)
            }
        })
    }
};
