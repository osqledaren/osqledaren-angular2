import {Injectable} from "@angular/core";
import {Archive} from "./model/enums";
import {ArticleQueryParams} from "./model/article-query-params";
import {Router} from "@angular/router";
import {Subject} from "rxjs/Subject";
import {ArchiveDistribution} from "./model/archive-distribution";
@Injectable()
export class ArchiveService {

    private archive: Archive;
    public activated: Subject<boolean> = new Subject();
    public archiveDistribution: Subject<ArchiveDistribution[]> = new Subject();

    constructor(private router: Router) {
        this.archive = null;
    }

    private getArchiveDistribution(): ArchiveDistribution[] {

        let archiveDistribution = <ArchiveDistribution[]>[];

        // TODO: Get archive from wordpress.

        archiveDistribution.push(<ArchiveDistribution>{
            year: 2017,
            months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        });

        archiveDistribution.push(<ArchiveDistribution>{
            year: 2016,
            months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        });

        return archiveDistribution;
    }

    public activate(archive: Archive) {
        this.archive = archive;
        this.activated.next(true);
        this.archiveDistribution.next(this.getArchiveDistribution());
    }

    public deactivate() {
        this.archive = null;
        this.activated.next(false);
    }

    public currentArchive(): Archive {
        return this.archive;
    }

    public search(searchTerm: string) {
        switch (this.archive) {
            case Archive.article:

                let args: ArticleQueryParams = <ArticleQueryParams>{};
                args.searchTerm = searchTerm;
                this.router.navigate(['/articles', 'search', searchTerm]);

                break;
            case Archive.play:
                break;
            case Archive.pod:
                break;
            default:
                break;
        }
    }

}
