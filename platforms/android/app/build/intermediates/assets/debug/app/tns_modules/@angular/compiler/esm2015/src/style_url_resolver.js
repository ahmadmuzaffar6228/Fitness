/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export class StyleWithImports {
    constructor(style, styleUrls) {
        this.style = style;
        this.styleUrls = styleUrls;
    }
}
export function isStyleUrlResolvable(url) {
    if (url == null || url.length === 0 || url[0] == '/')
        return false;
    const schemeMatch = url.match(URL_WITH_SCHEMA_REGEXP);
    return schemeMatch === null || schemeMatch[1] == 'package' || schemeMatch[1] == 'asset';
}
/**
 * Rewrites stylesheets by resolving and removing the @import urls that
 * are either relative or don't have a `package:` scheme
 */
export function extractStyleUrls(resolver, baseUrl, cssText) {
    const foundUrls = [];
    const modifiedCssText = cssText.replace(CSS_STRIPPABLE_COMMENT_REGEXP, '')
        .replace(CSS_IMPORT_REGEXP, (...m) => {
        const url = m[1] || m[2];
        if (!isStyleUrlResolvable(url)) {
            // Do not attempt to resolve non-package absolute URLs with URI
            // scheme
            return m[0];
        }
        foundUrls.push(resolver.resolve(baseUrl, url));
        return '';
    });
    return new StyleWithImports(modifiedCssText, foundUrls);
}
const CSS_IMPORT_REGEXP = /@import\s+(?:url\()?\s*(?:(?:['"]([^'"]*))|([^;\)\s]*))[^;]*;?/g;
const CSS_STRIPPABLE_COMMENT_REGEXP = /\/\*(?!#\s*(?:sourceURL|sourceMappingURL)=)[\s\S]+?\*\//g;
const URL_WITH_SCHEMA_REGEXP = /^([^:/?#]+):/;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVfdXJsX3Jlc29sdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXIvc3JjL3N0eWxlX3VybF9yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFPSCxNQUFNO0lBQ0osWUFBbUIsS0FBYSxFQUFTLFNBQW1CO1FBQXpDLFVBQUssR0FBTCxLQUFLLENBQVE7UUFBUyxjQUFTLEdBQVQsU0FBUyxDQUFVO0lBQUcsQ0FBQztDQUNqRTtBQUVELE1BQU0sK0JBQStCLEdBQVc7SUFDOUMsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDO1FBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNuRSxNQUFNLFdBQVcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDdEQsTUFBTSxDQUFDLFdBQVcsS0FBSyxJQUFJLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDO0FBQzFGLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLDJCQUNGLFFBQXFCLEVBQUUsT0FBZSxFQUFFLE9BQWU7SUFDekQsTUFBTSxTQUFTLEdBQWEsRUFBRSxDQUFDO0lBRS9CLE1BQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsNkJBQTZCLEVBQUUsRUFBRSxDQUFDO1NBQzdDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLEdBQUcsQ0FBVyxFQUFFLEVBQUU7UUFDN0MsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QixFQUFFLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQiwrREFBK0Q7WUFDL0QsU0FBUztZQUNULE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZCxDQUFDO1FBQ0QsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDWixDQUFDLENBQUMsQ0FBQztJQUMvQixNQUFNLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDMUQsQ0FBQztBQUVELE1BQU0saUJBQWlCLEdBQUcsaUVBQWlFLENBQUM7QUFDNUYsTUFBTSw2QkFBNkIsR0FBRywwREFBMEQsQ0FBQztBQUNqRyxNQUFNLHNCQUFzQixHQUFHLGNBQWMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLy8gU29tZSBvZiB0aGUgY29kZSBjb21lcyBmcm9tIFdlYkNvbXBvbmVudHMuSlNcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJjb21wb25lbnRzL3dlYmNvbXBvbmVudHNqcy9ibG9iL21hc3Rlci9zcmMvSFRNTEltcG9ydHMvcGF0aC5qc1xuXG5pbXBvcnQge1VybFJlc29sdmVyfSBmcm9tICcuL3VybF9yZXNvbHZlcic7XG5cbmV4cG9ydCBjbGFzcyBTdHlsZVdpdGhJbXBvcnRzIHtcbiAgY29uc3RydWN0b3IocHVibGljIHN0eWxlOiBzdHJpbmcsIHB1YmxpYyBzdHlsZVVybHM6IHN0cmluZ1tdKSB7fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTdHlsZVVybFJlc29sdmFibGUodXJsOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgaWYgKHVybCA9PSBudWxsIHx8IHVybC5sZW5ndGggPT09IDAgfHwgdXJsWzBdID09ICcvJykgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBzY2hlbWVNYXRjaCA9IHVybC5tYXRjaChVUkxfV0lUSF9TQ0hFTUFfUkVHRVhQKTtcbiAgcmV0dXJuIHNjaGVtZU1hdGNoID09PSBudWxsIHx8IHNjaGVtZU1hdGNoWzFdID09ICdwYWNrYWdlJyB8fCBzY2hlbWVNYXRjaFsxXSA9PSAnYXNzZXQnO1xufVxuXG4vKipcbiAqIFJld3JpdGVzIHN0eWxlc2hlZXRzIGJ5IHJlc29sdmluZyBhbmQgcmVtb3ZpbmcgdGhlIEBpbXBvcnQgdXJscyB0aGF0XG4gKiBhcmUgZWl0aGVyIHJlbGF0aXZlIG9yIGRvbid0IGhhdmUgYSBgcGFja2FnZTpgIHNjaGVtZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdFN0eWxlVXJscyhcbiAgICByZXNvbHZlcjogVXJsUmVzb2x2ZXIsIGJhc2VVcmw6IHN0cmluZywgY3NzVGV4dDogc3RyaW5nKTogU3R5bGVXaXRoSW1wb3J0cyB7XG4gIGNvbnN0IGZvdW5kVXJsczogc3RyaW5nW10gPSBbXTtcblxuICBjb25zdCBtb2RpZmllZENzc1RleHQgPSBjc3NUZXh0LnJlcGxhY2UoQ1NTX1NUUklQUEFCTEVfQ09NTUVOVF9SRUdFWFAsICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoQ1NTX0lNUE9SVF9SRUdFWFAsICguLi5tOiBzdHJpbmdbXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSBtWzFdIHx8IG1bMl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNTdHlsZVVybFJlc29sdmFibGUodXJsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERvIG5vdCBhdHRlbXB0IHRvIHJlc29sdmUgbm9uLXBhY2thZ2UgYWJzb2x1dGUgVVJMcyB3aXRoIFVSSVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNjaGVtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kVXJscy5wdXNoKHJlc29sdmVyLnJlc29sdmUoYmFzZVVybCwgdXJsKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICByZXR1cm4gbmV3IFN0eWxlV2l0aEltcG9ydHMobW9kaWZpZWRDc3NUZXh0LCBmb3VuZFVybHMpO1xufVxuXG5jb25zdCBDU1NfSU1QT1JUX1JFR0VYUCA9IC9AaW1wb3J0XFxzKyg/OnVybFxcKCk/XFxzKig/Oig/OlsnXCJdKFteJ1wiXSopKXwoW147XFwpXFxzXSopKVteO10qOz8vZztcbmNvbnN0IENTU19TVFJJUFBBQkxFX0NPTU1FTlRfUkVHRVhQID0gL1xcL1xcKig/ISNcXHMqKD86c291cmNlVVJMfHNvdXJjZU1hcHBpbmdVUkwpPSlbXFxzXFxTXSs/XFwqXFwvL2c7XG5jb25zdCBVUkxfV0lUSF9TQ0hFTUFfUkVHRVhQID0gL14oW146Lz8jXSspOi87XG4iXX0=