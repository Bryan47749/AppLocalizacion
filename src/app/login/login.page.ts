import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { ConductorService } from '../servicios/conductor.service';
import { Conductor } from '../Clases/Clases';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email:string="prueba@email.com";
  pass:string="prueba";

  constructor(private navCtrl:NavController,
              private c:ConductorService,
              private toastCtrl:ToastController) { }

  ngOnInit() {
  }

  async presentToast(mesagge:string) {
    const toast = await this.toastCtrl.create({
      message: mesagge,
      duration: 2000
    });
    toast.present();
  }

  async ingresar(){
    if(this.email.length < 1 || this.pass.length < 1){
      this.presentToast("Ingresar el Usuario y Contraseña");
      return;
    }
    let conductor:Conductor = new Conductor();
    conductor.email = this.email;
    conductor.pass = this.pass;

    const valid = await this.c.Login(conductor);
    if(valid){
      this.navCtrl.navigateRoot('/main/tabs/tab1');
    }
  
  }

}
