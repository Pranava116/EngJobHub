import "../static/Footer.css"

export default function Footer()
{
    const logo = "/engjobhu_icon.jpg";
    return(
        
        <footer>
        <div class="row">
            <div class="col">
                <img src={logo} class="logo" alt="logo"></img>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam doloribus ab expedita, 
                    possimus culpa aliquid repudiandae facilis reiciendis accusamus alias repellat id quaerat voluptates iste. Eum exercitationem enim animi modi.
                </p>
            </div>
            <div class="col">
                <h3>Office <div class="underline"><span></span></div></h3>
                <p>Itpl Road</p>
                <p>WhiteField</p>
                <p>Karnataka,Pin 560066 ,India</p>
                <p class="email-id">hhasjgdj@gmail.com</p>
                <h4>+91-0123456789</h4>
            </div>
            <div class="col">
                <h3>Links <div class="underline"><span></span></div></h3>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Blog</a></li>
                    <li><a href="#">About us</a></li>
                    <li><a href="#">Features</a></li>
                    <li><a href="#">Contact us</a></li>
                </ul>
            </div>
            <div class="col">
                <div class="social-icons">
                    <i class="fa-brands fa-facebook"></i>
                    <i class="fa-brands fa-twitter"></i>
                    <i class="fa-brands fa-whatsapp"></i>
                    <i class="fa-brands fa-instagram"></i>
                </div>
            </div>
        </div>
        <hr/>
        <p class="copyright">&copy;EngJobhub @RNSIT</p>
    </footer>

    )
}