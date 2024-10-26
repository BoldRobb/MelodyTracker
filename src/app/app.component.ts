import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { NavbarLoginComponent } from "./components/navbars/navbar-login/navbar-login.component";
import { GridrowComponent } from "./components/gridrow/gridrow.component";

import { uploadFile } from './firebase/storage'; // Importar la función de almacenamiento



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarLoginComponent, GridrowComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MelodyTracker';

  async onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      try {
        const downloadURL = await uploadFile(file);
        console.log('File available at', downloadURL);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  }



}



