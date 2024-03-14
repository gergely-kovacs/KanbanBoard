import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { isNil } from 'lodash-es';

@Injectable({
  providedIn: 'root',
})
export class ThemingService {
  document = inject(DOCUMENT);

  loadStyle(style: 'dark' | 'light') {
    if (style === 'light') {
      this.document.body.classList.remove('dark');
    } else {
      this.document.body.classList.add('dark');
    }

    const head = this.document.getElementsByTagName('head')[0];
    let themeLink = this.document.getElementById('theme') as HTMLLinkElement;

    if (isNil(themeLink)) {
      themeLink = this.document.createElement('link');
      themeLink.id = 'theme';
      themeLink.rel = 'stylesheet';
      themeLink.type = 'text/css';
      head.appendChild(themeLink);
    }

    themeLink.href = `${style}.css`;
  }
}
