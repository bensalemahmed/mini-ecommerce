import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '@mini-ecommerce/shared-services-security';

/**
 * Root component for the Mini Ecommerce application.
 */
@Component({
  selector: 'mini-ecommerce-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  /**
   * Flag indicating whether the application is currently loading.
   */
  loading: boolean = false;

  /**
   * Subscription to the loader service's loading state.
   */
  private loaderSubscription!: Subscription;

  /**
   * Constructs an instance of AppComponent.
   * @param loaderService The loader service used to track loading state.
   */
  constructor(private loaderService: LoaderService) {}

  /**
   * Initializes the component.
   */
  ngOnInit(): void {
    this.loaderSubscription = this.loaderService.loading$.subscribe(
      (loading: boolean) => {
        this.loading = loading;
        console.log('Loading:', loading);
      }
    );
  }

  /**
   * Cleans up resources before the component is destroyed.
   */
  ngOnDestroy(): void {
    this.loaderSubscription.unsubscribe();
  }
}
