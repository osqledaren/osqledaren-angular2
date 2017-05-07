import {NgModule} from "@angular/core";
import {AdvertisementPageComponent} from "./advertisement-page/advertisement-page.component";
import {AdvertisementTopBannerComponent} from "./advertisement-top-banner/advertisement-top-banner.component";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {LoadableDeactivateGuard} from "../loader/loadable-deactivate.guard";

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forRoot([
            {
                path: 'annonsera',
                component: AdvertisementPageComponent,
                data: {name: 'advertise'},
                canDeactivate: [LoadableDeactivateGuard]
            },
        ])
    ],
    declarations: [
        AdvertisementPageComponent,
        AdvertisementTopBannerComponent
    ],
    providers: [],
    exports: [
        AdvertisementPageComponent,
        AdvertisementTopBannerComponent,
    ]
})
export class AdvertisementModule {
}
