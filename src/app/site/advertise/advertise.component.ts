import {Component} from '@angular/core';
import {UILoadableComponent} from '../../ui/abstract.ui-loadable.component';
import {ArchiveService} from '../../archive/archive.service';
import {UIViewLoaderService} from '../../ui/ui-view-loader.service';
import {Archive} from '../../archive/archive.enum';

@Component({
  selector: 'app-advertisement-page',
  templateUrl: 'advertise.component.html',
  styleUrls: ['advertise.component.scss']
})
export class AdvertiseComponent extends UILoadableComponent {
  covers: Array<string>;
  osqledaren_email: string;
  osqledaren_mobile: string;
  osqledaren_telephone: string;
  erik_tingstrom_email: string;
  erik_tingstrom_mobile: string;

  constructor(private archiveService: ArchiveService, loaderService: UIViewLoaderService) {

    super(loaderService);

    this.covers = ['https://wp.osqledaren.se/wp-content/themes/osqledaren/assets/img/covers/ol141502.jpg',
      'https://wp.osqledaren.se/wp-content/themes/osqledaren/assets/img/covers/ol141501.jpg',
      'https://wp.osqledaren.se/wp-content/themes/osqledaren/assets/img/covers/ol141500.jpg',
      'https://wp.osqledaren.se/wp-content/themes/osqledaren/assets/img/covers/ol131404.jpg',
      'https://wp.osqledaren.se/wp-content/themes/osqledaren/assets/img/covers/ol131403.jpg',
      'https://wp.osqledaren.se/wp-content/themes/osqledaren/assets/img/covers/ol131402.jpg',
      'https://wp.osqledaren.se/wp-content/themes/osqledaren/assets/img/covers/ol131401.jpg',
      'https://wp.osqledaren.se/wp-content/themes/osqledaren/assets/img/covers/ol131400.jpg',
      'https://wp.osqledaren.se/wp-content/themes/osqledaren/assets/img/covers/ol121305.jpg',
      'https://wp.osqledaren.se/wp-content/themes/osqledaren/assets/img/covers/ol121304.jpg',
      'https://wp.osqledaren.se/wp-content/themes/osqledaren/assets/img/covers/ol121303.jpg',
      'https://wp.osqledaren.se/wp-content/themes/osqledaren/assets/img/covers/ol121302.jpg',
      'https://wp.osqledaren.se/wp-content/themes/osqledaren/assets/img/covers/ol121301.jpg',
      'https://wp.osqledaren.se/wp-content/themes/osqledaren/assets/img/covers/ol141502.jpg'];

    this.osqledaren_email = 'osqledaren@ths.kth.se';
    this.osqledaren_mobile = '08-790 98 70';
    this.osqledaren_telephone = '070-790 98 70';

    this.erik_tingstrom_email = 'erik.tingstrom@newsfactory.se';
    this.erik_tingstrom_mobile = '08-505 73 812';

  }

  init() {
    this.loaded();
    this.archiveService.activate(Archive.article);
  }

}
