 
<script>
import { useRoute } from 'vue-router'
const route = useRoute()

export default {
  render() {
    const { meta: { link } } = route;
    if ({ link }.link === "") {
      return "404";
    }
    let url = { link }.link;
    const height = document.documentElement.clientHeight - 94.5 + "px";
    const style = { height: height };
    // TODO .未完成
    return '404'
    // return ( 
    //   // <div style={style} >
    //   //   <iframe
    //   //     src={url}
    //   //     frameborder="no"
    //   //     style="width: 100%; height: 100%"
    //   //     scrolling="auto"
    //   //   ></iframe>
    //   // </div>
    // )
  }
}
</script>
