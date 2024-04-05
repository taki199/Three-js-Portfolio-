import gsap from 'gsap';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { reviews } from './data';
import imagesLoaded from "imagesloaded";
import Scrollbar,{ScrollbarPlugin} from "smooth-scrollbar";

class DisableScrollPlugin extends ScrollbarPlugin {
    static pluginName = 'disableScroll';
  
    static defaultOptions = {
      direction: '',
    };
  
    transformDelta(delta) {
      if (this.options.direction) {
        delta[this.options.direction] = 0;
      }
  
      return { ...delta };
    }
  }
  
  // load the plugin
  Scrollbar.use(DisableScrollPlugin);

  class AnchorPlugin extends ScrollbarPlugin {
    static pluginName = 'anchor';
  
    onHashChange = () => {
      this.jumpToHash(window.location.hash);
    };
  
    onClick = (event) => {
      const { target } = event;
  
      if (target.tagName !== 'A') {
        return;
      }
  
      const hash = target.getAttribute('href');
  
      if (!hash || hash.charAt(0) !== '#') {
        return;
      }
  
      this.jumpToHash(hash);
    };
  
    jumpToHash = (hash) => {
      const { scrollbar } = this;
  
      if (!hash) {
        return;
      }    
  
      // reset scrollTop
      scrollbar.containerEl.scrollTop = 0;
  
      scrollbar.scrollIntoView(document.querySelector(hash));
    };
  
    onInit() {
      this.jumpToHash(window.location.hash);
  
      window.addEventListener('hashchange', this.onHashChange);
  
      this.scrollbar.contentEl.addEventListener('click', this.onClick);
    }
  
    onDestory() {
      window.removeEventListener('hashchange', this.onHashChange);
  
      this.scrollbar.contentEl.removeEventListener('click', this.onClick);
    }
  }
  
  // usage
  Scrollbar.use(AnchorPlugin);

const bar = document.querySelector('.loading__bar--inner')
const counter_num=document.querySelector('.loading__counter--number')
let c =0

let barInterval=setInterval( ()=>{
 bar.style.width=c+"%"
 counter_num.innerText=c + "%"
 c++
 if(c===101){
    clearInterval(barInterval)
    gsap.to(".loading__bar",{
        duration:5,
        rotate:"90deg",
        left:"1000%",
    
    
    });
    gsap.to(".loading__text,.loading__counter",{
        duration:0.5,
       opacity:0,
    
    
    });
    gsap.to(".loading__box",{
        duration:1,
        height:"500px",
        borderRadius:"50%",
    
    
    });
    imagesLoaded(document.querySelectorAll('img'),()=>{
        gsap.to(".loading__svg",{
            duration:10,
            opacity:1,
            rotate:"360deg",
        
        
        });
        gsap.to(".loading__box", {
            modules: [Navigation, Pagination],
            delay: 2,
            borderColor: "transparent", // Set the border color to transparent
            duration: 1, // Set the duration for the fade-out effect
          });
          gsap.to(".loading",{
           delay:3,
           duration:2,
           zIndex:1,
           background:"transparent",
           opacity:0.5
        
        });
        gsap.to(".loading__svg",{
            delay:2,
            duration:100,
            rotate:"360deg",
        
        
        });
        gsap.to(".header",{
            duration:1,
            delay:2,
            top:"0",
        })
        gsap.to(".socials",{
            duration:1,
            delay:2.5,
            bottom:"10rem",
        })
        gsap.to(".skills",{
          duration:1,
          delay:6,
          top:"5rem",
      })
        gsap.to(".scrollDown",{
            duration:1,
            delay:3,
            bottom:"3rem",
        })

        setTimeout(()=>{
            let options={
                damping:0.1,
                alwaysShowTracks:true,
                plugins: {
                    disableScroll: {
                      direction: 'x',
                    },
                  },
                
               
            };
            let pageSmoothScroll=Scrollbar.init(document.body,options);
        pageSmoothScroll.track.xAxis.element.remove()

        },2000);
        
        

    });
    
 }
},20)
//Exp Swipper 
Swiper.use([Pagination,Navigation])

var swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    breakpoints:{
        850:{
            slidesPerView:2,

        },
        1400:{
            slidesPerView:3,

        },
        1900:{
            slidesPerView:4,

        }
    },
    pagination: {
        el: ".swiper-pagination",
        type:"bullets",
        clickable:true,
      },
      
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    
  });
  console.log(swiper.passedParams.navigation);

const swiper_container=document.querySelector('.swiper-wrapper');
reviews.map( review=>{
 let template=` <div class="swiper-slide">
 <div class="review">
     <div class="review__card">
         <div class="review__topborder"></div>
         <div class="review__text">
             <h3>${review.name}</h3>
             <span>${review.position}</span><br>
             ${review.review}
         </div>
     </div>
 </div>
</div>`;
swiper_container.innerHTML+=template;
})