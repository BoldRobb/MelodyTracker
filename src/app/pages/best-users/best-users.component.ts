import { Component } from '@angular/core';
import { FollowsComponent } from "../../components/follows/follows.component";

@Component({
  selector: 'app-best-users',
  standalone: true,
  imports: [FollowsComponent],
  templateUrl: './best-users.component.html',
  styleUrl: './best-users.component.css'
})
export class BestUsersComponent {

}
