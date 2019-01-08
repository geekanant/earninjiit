<template>


<div>
    <div  class="container" v-if="signup"> 
    <h6 class="text-center mt-4">Posts in the past 1 week will appear here.</h6>
       <div class="input-group">
       <select  class="abc form-control mt-3" v-model="category" @change="categoryfind()"  >
                <option value=""  selected="selected">Filter a category </option>
                <option :value="category.name" :key="category.name" v-for="category in categories">
                    {{category.name}}
                </option>
        </select>
        <button @click="clearFilter()" :disabled="category==''"  class="btn btn-sm ml-2 mt-3 btn-success">
           <i class="fas fa-spin  fa-spinner" v-if="loading"></i>
                {{loading?'':'Clear'}}
        </button>
        </div>
        <div class="loader text-center" v-if="loading">
           <i class="fas fa-5x mt-5 fa-spin fa-spinner"></i>
        </div>
        <div class="col-md-8 offset-md-2" v-for="article in articles"  :key="article.id">
            <Article :article="article" />
        </div>
  <div class="col-md-8 offset-md-2" v-if="articles.length<1">
     <div class="container mt-5 text-center ">
      <p>Sorry! No posts on this category yet. Check out later :)</p>
     </div>
  </div>
</div>

  <div v-if="!signup"> 
   <section id="hero">
    <div class="hero-container">
      <div class="wow fadeIn">
        <h1>Welcome to Ea₹n in JIIT</h1>
        <h2>Do Work. Get Paid.</h2>
          <div class="actions">       
            <button @click="registerUser()" :disabled="loading" class="loginBtn loginBtn--google">
                <i class="fas fa-spin fa-spinner" v-if="loading"></i>
                {{loading?'':'Sign in'}}
            </button>
        </div>
      </div>
    </div>
  </section>

  <section id="about">
    <div class="container wow fadeInUp">
      <div class="row">
        <div class="col-md-12">
          <h3 class="section-title">About Earn in JIIT</h3>
          <div class="section-title-divider"></div>
          <p class="section-description">Earn in JIIT is an initiative by JIItians which enables college students to earn money by doing easy tasks.</p>
        </div>
      </div>
    </div>
    <div class="container about-container wow fadeInUp">
      <div class="row">

        <div class="col-md-6 about-content">
          <h2 class="about-title">What's the whole fuss about?</h2>
          <p class="about-text">Be it a simple task such as photocopy/print-outs or be it a complex one such as app development, Earn in JIIT provides a platform for us, JIItians to work and earn money.
          </p>
          
          <p class="about-text">Let's say you have to submit your practical file tomorrow and it is not possible for you to get print outs now. No worries! Using Earn in JIIT, you can post your requirement and mention urgently required. Someone who can get it 
            done will definitely contact you and charge the nominal fees. 
            
          </p>
          <p class="about-text">
          Three principles on which Earn In JIIT is based:<br>
            1) If you're good at something, never do it for free.<br>
            2) Do not sit idle and utilise free time in college.<br>
            3) Generate passive income in college.
          </p>
          <br><br>
        </div>
          <div class="youtube col-lg-6">
              <iframe class="youtube" src="https://www.youtube.com/embed/hWHeHwR4Mes" allowfullscreen></iframe>
        </div>
      </div>
    </div>
  </section>



  <section id="team1">
   <div class="container wow fadeInUp">
      <div class="row">
        <div class="col-md-12">
          <h3 class="section-title" style = "color: white;"> Team</h3>
          <div class="section-title-divider"></div>
        </div>
      </div>

        <div class="row">
          <div class="column">
            <div class="member1">
              <img src="img/team-1.jpg" class="mx-auto d-block" alt="Anant Patni" width="100%">

              <div class="member-info1">
                <div class="member-info-content1">
                  <h4>Anant Patni</h4>
                  <span>Developer</span>
                  <div class="social1">
                    <a href="https://github.com/geekanant" target="_blank"><i class="fa fa-github"></i></a>
                    <a href="https://www.linkedin.com/in/anant-patni-660594130/" target="_blank"><i class="fa fa-linkedin"></i></a>
                    <a href="https://www.facebook.com/anantpatni1" target="_blank"><i class="fa fa-facebook"></i></a>
                    <a href="mailto:anantpatni1@gmail.com" target="_blank"><i class="fa fa-envelope"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="column1v">
            <div class="member1">
              <img src="img/team-2.jpg" class="mx-auto d-block" alt="" width="100%">
              <div class="member-info1">
                <div class="member-info-content1">
                  <h4>Vishal Chaudhary</h4>
                  <span>Developer</span>
                  <div class="social1">
                    <a href="https://github.com/vishal758" target="_blank"><i class="fa fa-github"></i></a>
                    <a href="https://www.linkedin.com/in/vishal-chaudhary-60547b148/" target="_blank"><i class="fa fa-linkedin"></i></a>
                    <a href="https://www.facebook.com/vishal.chaudhary.3517" target="_blank"><i class="fa fa-facebook"></i></a>
                    <a href="mailto:vishalchaudhary758@gmail.com" target="_blank"><i class="fa fa-envelope"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
      
             </div>
             
        <div class="row">
          <div class="column2">
            <div class="member1">
              <img src="img/team-3.jpg" class="mx-auto d-block" alt="Anant Patni" width="100%">

              <div class="member-info1">
                <div class="member-info-content1">
                 <h4>Manika Kaushik</h4>
                            <span>Marketing</span>
                            <div class="social1">
                                <a href="https://www.linkedin.com/in/manika-kaushik-74a29916b" target="_blank"><i class="fa fa-linkedin"></i></a>
                                <a href="https://www.facebook.com/manika.kaushik.14" target="_blank"><i class="fa fa-facebook"></i></a>
                                <a href="mailto:manika.kaushik1430@gmail.com" target="_blank"> <i class="fa fa-envelope"></i></a>
                          </div>
                </div>
              </div>
            </div>
          </div>

          <div class="column3">
            <div class="member1">
              <img src="img/shivam.jpg" class="mx-auto d-block" alt="" width="100%">
              <div class="member-info1">
                <div class="member-info-content1">
                  <h4>Shivam Singhal</h4>
                  <span>Marketing</span>
                  <div class="social1">
                     <a href="https://www.linkedin.com/in/shivam-singhal-32362816a" target="_blank"><i class="fa fa-linkedin"></i></a>
                    <a href="https://www.facebook.com/profile.php?id=100002716118308" target="_blank"><i class="fa fa-facebook"></i></a>
                    <a href="mailto:singhalshivam96@gmail.com" target="_blank"><i class="fa fa-envelope"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>      
          <div class="column1">
              <div class="member1" >
                        <img src="img/bhartendu.jpg" class="mx-auto d-block" alt="" width="100%">
                        <div class="member-info1">
                          <div class="member-info-content1">
                            <h4>Bhartendu Dubey</h4>
                              <span>Marketing</span>
                              <div class="social1">
                                <a href="https://www.linkedin.com/in/bhartendu-dubey-0312b2111" target="_blank"><i class="fa fa-linkedin"></i></a>
                                <a href="https://www.facebook.com/bhartendu.dubey" target="_blank"><i class="fa fa-facebook"></i></a>
                                <a href="mailto:b.dubey1111@gmail.com" target="_blank"><i class="fa fa-envelope"></i></a>
                              </div>
                          </div>
                        </div>
                      </div>
                </div>

             </div>
    
  </section>

 <section id="faq">
    <div class="container wow fadeInUp">
      <div class="row">
        <div class="col-md-12">
          <h3 class="section-title">FAQ</h3>
          <div class="section-title-divider"></div>
          <p class="section-description">Some of the frequently asked questions.</p>
        </div>
      </div>
    <br><br>
    <div class="container faq1-container wow fadeInUp">
        <div class="row">
          <div class="faq1-content section-description1">
            <h4 class="faq1-title"><a style="  pointer-events: none;" href="">What sort of skills do I need to possess if I want to earn money via your platform?</a></h4>
            <p class="faq1-text">Not specifically any skill. Earn in JIIT is open to all.
            </p><br>
            <h4 class="faq1-title"><a style="  pointer-events: none;" href="">How do I get started?</a></h4>
            <p class="faq1-text">Just sign in with your <b>google account</b> and you are good to go :)
            </p><br>
            
          </div>
        </div>
      </div>
       
    </div>
  </section>


<!--
    <section id="contact" class="section-bg wow fadeInUp">
      <div class="container">

      <div class="row">
        <div class="col-md-12">
          <h3 class="section-title">Contact Us</h3>
          <div class="section-title-divider"></div>
          <p class="section-description">Feel free to reach out to us with any suggestions/queries/advertisements.</p>
        </div>
      </div>

        <div class="form">
          <div id="sendmessage">Your message has been sent. Thank you!</div>
          <div id="errormessage"></div>
          <form action="" method="post" role="form" class="contactForm">
            <div class="form-row">
              <div class="form-group col-md-6">
                <input type="text" name="name" class="form-control" id="name" placeholder="Your Name" required="" />
              </div>
              <div class="form-group col-md-6">
                <input type="email" class="form-control" name="email" id="email" placeholder="Your Email" required="" />
              </div>
            </div>
            <div class="form-group">
              <input type="text" class="form-control" name="subject" id="subject" placeholder="Subject" required="" />
            </div>
            <div class="form-group">
              <textarea class="form-control" name="message" rows="5" data-rule="required" required=""></textarea>
            </div>
            <div class="text-center"><button type="submit">Send Message</button></div>
          </form>
        </div>
      </div>
    </section>
    -->
   </div>
</div>
</template>
<style>

</style>

<script>

import Axios from 'axios';
import Article from '@/components/Article.vue'
import firebase from 'firebase'

export default {
       
    components:{
        Article
    },
    computed:{
    signup(){
      return this.$root.auth.displayName;
      }
    },
     mounted(){
         this.getcontact();
         this.getArticles();
         this.getCategories();
     },
     data(){

         return{
             loading:true,
             logged: this.$root.auth,
             articles:{},
             category:"",
             categories:[],
             postedBy:this.$root.auth.uid
         }
     },
    methods:{
        
    registerUser() {

    const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then((result) => {
          
          const name = result.user.displayName.split(" ");
          console.log(name[0]);
          console.log(name[1]);
           Axios.post('/users/register',{
                first_name:name[0],
                last_name: name[1],
                email: result.user.email,
            }).then(()=>{
                localStorage.setItem("auth",JSON.stringify(result.user));
                this.$root.auth= (result.user);
                this.$root.first_name= name[0];
                this.$noty.success('Successfully logged in.');
                this.$router.go()
            })  
        }).catch((err) => {
          alert('Oops. ' + err.message)
        });      
        },
      
        getArticles(){
             Axios.get('/users/posts',{
                params: {
                    postedBy: this.postedBy,
                }             
             }).then(response=>{
                 this.loading=false;
                 this.articles=response.data.posts;
             });
        },
        getcontact(){
             Axios.get('/users/getmodecontact',{
                params: {
                    email:this.$root.auth.email
                }             
             }).then(response=>{
               const moc= response.data.modeofcontact;
               this.$root.modeofcontact=moc;
             });
          
        },
        clearFilter(){
             Axios.get('/users/posts',{
               params: {
                    postedBy: this.postedBy,
                }   
             }).then(response=>{
                 this.articles=response.data.posts;
                 this.category="";
             });
        },
        
        categoryfind(){
            Axios.get('/users/findposts',{
                params: {
                    category: this.category,
                    postedBy: this.postedBy,
            }             
            }).then(response=>{
                 this.articles=response.data.posts;
             });
        },

        getCategories(){

            const categories=localStorage.getItem('categories');

            if(categories){
                this.categories=JSON.parse(categories);
                return;
            }

            Axios.get('/users/categories').then(res=>{
                this.categories=res.data.category;
                localStorage.setItem("categories",JSON.stringify(this.categories));
            })
        }

     }
};
</script>
