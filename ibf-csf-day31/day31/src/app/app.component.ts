import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title: string = 'deep blue sea';
  sceneryUrl: string = "https://t3.ftcdn.net/jpg/05/63/76/92/360_F_563769202_XvjMvyMO593Wt70Um2OQPJ5CZrTXbT4t.jpg";

  imgs: string[] = [
    "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?cs=srgb&dl=pexels-kellie-churchman-371878-1001682.jpg&fm=jpg",
    "https://grist.org/wp-content/uploads/2013/10/shutterstock_118021813.jpg?quality=75&strip=all",
    "https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://thumbs.dreamstime.com/b/seascape-over-under-sea-cloudy-sky-rocky-seabed-seascape-over-under-sea-surface-cloudy-blue-sky-rocky-seabed-underwater-108661258.jpg"
  ]

  handleClicked(event: String) {
    console.log('>>>>> My app component image clicked: ' + event)
  }
}
