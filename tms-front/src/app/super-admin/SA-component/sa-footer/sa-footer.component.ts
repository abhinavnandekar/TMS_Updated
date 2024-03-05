import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sa-footer',
  templateUrl: './sa-footer.component.html',
  styleUrls: ['./sa-footer.component.css']
})
export class SAFooterComponent  implements OnInit{
       currentTime: Date = new Date();
ngOnInit(): void {
     setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
}
}
