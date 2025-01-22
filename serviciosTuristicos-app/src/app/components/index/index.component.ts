import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Footer } from '../shared/FooterComponente/footer.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [MatCardModule, MatIconModule, RouterLink, Footer ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

}
