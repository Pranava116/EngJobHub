import "../static/CompanySlider.css"
import apple from "../static/images/apple.png"
export default function CompanySlider(){
    return(
        <div class="wrapper">
        <div class="item item1"><img src="https://th.bing.com/th/id/OIP.OM3IZR7pTud4p2-vhNCbEgHaEK?rs=1&pid=ImgDetMain" alt="meta" class="img"></img></div>
        <div class="item item2"><img src="https://th.bing.com/th/id/OIP.SFCCQp0MMXRcYBjmR5EXewHaD4?rs=1&pid=ImgDetMain" alt="amazon" class="img"></img></div>
        <div class="item item3"><img src="https://thumbs.dreamstime.com/b/logo-icon-vector-logos-icons-set-social-media-flat-banner-vectors-svg-eps-jpg-jpeg-paper-texture-glossy-emblem-wallpaper-210442700.jpg" alt="google" class="img"></img></div>
        <div class="item item4"><img src="https://st3.depositphotos.com/1102480/12576/i/450/depositphotos_125765680-stock-photo-microsoft-and-its-own-brands.jpg" alt="microsoft" class="img"></img></div>
        <div class="item item5"><img src="https://images.contentstack.io/v3/assets/blt9e072702140c498e/bltea5495240d348c1f/5f51dca8ee702027c4ce85d9/Overview_Adobe_logo.png" alt="microsoft" class="img"></img></div>
        <div class="item item6"><img src="https://assets.gadgets360cdn.com/pricee/assets/brand/og_hp_logo.png" alt="hp" class="img"></img></div>
        <div class="item item7"><img src={apple} alt="apple" class="img"></img></div>
        <div class="item item8"><img src="https://s23.q4cdn.com/407969754/files/doc_multimedia/Uber_Logo_Black_RGB.jpg" alt="uber" class="img"></img></div>
    </div>
    )
}