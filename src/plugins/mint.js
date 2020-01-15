import Vue from 'vue'

import {
  Header,
  Toast,
  Indicator,
  Button,
  Popup,
  Navbar,
  TabItem,
  Loadmore,
  TabContainer,
  TabContainerItem,
  Radio,
  Swipe,
  SwipeItem,
  InfiniteScroll
} from 'mint-ui'

Vue.component(Header.name, Header)
Vue.component(Button.name, Button)
Vue.component(Popup.name, Popup)
Vue.component(Navbar.name, Navbar)
Vue.component(TabItem.name, TabItem)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.component(Loadmore.name, Loadmore)
Vue.component(Radio.name, Radio)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.use(InfiniteScroll)
Vue.prototype.Indicator = Indicator
Vue.prototype.$toast = Toast
