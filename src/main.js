import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import "./assets/styles/index.scss"; // global css
import SvgIcon from "@/components/SvgIcon/index.vue"; // svg component
import store from './store/index'
// register globally
import router from "./router";
import 'virtual:svg-icons-register';
import './permission.js' // permission control
import { getDicts } from "@/api/system/dict/data.js";
import { getConfigKey } from "@/api/system/config";
import { parseTime, resetForm, addDateRange, selectDictLabel, selectDictLabels, download, handleTree } from "@/utils/ruoyi";

// 指令
import hasPermi from './directive/permission/hasPermi'



const app = createApp(App);
// 全局方法挂载

app.config.globalProperties.getDicts = getDicts
app.config.globalProperties.getConfigKey = getConfigKey
app.config.globalProperties.parseTime = parseTime
app.config.globalProperties.resetForm = resetForm
app.config.globalProperties.addDateRange = addDateRange
app.config.globalProperties.selectDictLabel = selectDictLabel
app.config.globalProperties.selectDictLabels = selectDictLabels
app.config.globalProperties.download = download
app.config.globalProperties.handleTree = handleTree
app.use(ElementPlus);
app.use(router);
app.use(store);
app.component("svg-icon", SvgIcon);
// app.directive()
// app.directive('hasRole', hasRole)
app.directive('hasPermi', hasPermi)
// app.directive('dialogDrag', dialogDrag)

app.mount("#app");
