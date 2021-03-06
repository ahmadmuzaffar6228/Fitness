/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(null, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/common/locales/ca-IT", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // THIS CODE IS GENERATED - DO NOT MODIFY
    // See angular/tools/gulp-tasks/cldr/extract.js
    var u = undefined;
    function plural(n) {
        var i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, '').length;
        if (i === 1 && v === 0)
            return 1;
        return 5;
    }
    exports.default = [
        'ca-IT', [['a. m.', 'p. m.'], u, u], u,
        [
            ['dg', 'dl', 'dt', 'dc', 'dj', 'dv', 'ds'], ['dg.', 'dl.', 'dt.', 'dc.', 'dj.', 'dv.', 'ds.'],
            ['diumenge', 'dilluns', 'dimarts', 'dimecres', 'dijous', 'divendres', 'dissabte'],
            ['dg.', 'dl.', 'dt.', 'dc.', 'dj.', 'dv.', 'ds.']
        ],
        u,
        [
            ['GN', 'FB', 'MÇ', 'AB', 'MG', 'JN', 'JL', 'AG', 'ST', 'OC', 'NV', 'DS'],
            [
                'de gen.', 'de febr.', 'de març', 'd’abr.', 'de maig', 'de juny', 'de jul.', 'd’ag.',
                'de set.', 'd’oct.', 'de nov.', 'de des.'
            ],
            [
                'de gener', 'de febrer', 'de març', 'd’abril', 'de maig', 'de juny', 'de juliol',
                'd’agost', 'de setembre', 'd’octubre', 'de novembre', 'de desembre'
            ]
        ],
        [
            ['GN', 'FB', 'MÇ', 'AB', 'MG', 'JN', 'JL', 'AG', 'ST', 'OC', 'NV', 'DS'],
            [
                'gen.', 'febr.', 'març', 'abr.', 'maig', 'juny', 'jul.', 'ag.', 'set.', 'oct.', 'nov.',
                'des.'
            ],
            [
                'gener', 'febrer', 'març', 'abril', 'maig', 'juny', 'juliol', 'agost', 'setembre', 'octubre',
                'novembre', 'desembre'
            ]
        ],
        [['aC', 'dC'], u, ['abans de Crist', 'després de Crist']], 1, [6, 0],
        ['d/M/yy', 'd MMM y', 'd MMMM \'de\' y', 'EEEE, d MMMM \'de\' y'],
        ['H:mm', 'H:mm:ss', 'H:mm:ss z', 'H:mm:ss zzzz'],
        ['{1} {0}', '{1}, {0}', '{1} \'a\' \'les\' {0}', u],
        [',', '.', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
        ['#,##0.###', '#,##0%', '#,##0.00 ¤', '#E0'], '€', 'euro', {
            'AUD': ['AU$', '$'],
            'BRL': [u, 'R$'],
            'CAD': [u, '$'],
            'CNY': ['¥'],
            'ESP': ['₧'],
            'JPY': ['JP¥', '¥'],
            'MXN': [u, '$'],
            'THB': ['฿'],
            'USD': [u, '$'],
            'VEF': [],
            'XCD': [u, '$']
        },
        plural
    ];
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2EtSVQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21tb24vbG9jYWxlcy9jYS1JVC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7OztJQUVILHlDQUF5QztJQUN6QywrQ0FBK0M7SUFFL0MsSUFBTSxDQUFDLEdBQUcsU0FBUyxDQUFDO0lBRXBCLGdCQUFnQixDQUFTO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDbEYsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNqQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELGtCQUFlO1FBQ2IsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDdEM7WUFDRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDO1lBQzdGLENBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDO1lBQ2pGLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FB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LyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vLyBUSElTIENPREUgSVMgR0VORVJBVEVEIC0gRE8gTk9UIE1PRElGWVxuLy8gU2VlIGFuZ3VsYXIvdG9vbHMvZ3VscC10YXNrcy9jbGRyL2V4dHJhY3QuanNcblxuY29uc3QgdSA9IHVuZGVmaW5lZDtcblxuZnVuY3Rpb24gcGx1cmFsKG46IG51bWJlcik6IG51bWJlciB7XG4gIGxldCBpID0gTWF0aC5mbG9vcihNYXRoLmFicyhuKSksIHYgPSBuLnRvU3RyaW5nKCkucmVwbGFjZSgvXlteLl0qXFwuPy8sICcnKS5sZW5ndGg7XG4gIGlmIChpID09PSAxICYmIHYgPT09IDApIHJldHVybiAxO1xuICByZXR1cm4gNTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgW1xuICAnY2EtSVQnLCBbWydhLiBtLicsICdwLiBtLiddLCB1LCB1XSwgdSxcbiAgW1xuICAgIFsnZGcnLCAnZGwnLCAnZHQnLCAnZGMnLCAnZGonLCAnZHYnLCAnZHMnXSwgWydkZy4nLCAnZGwuJywgJ2R0LicsICdkYy4nLCAnZGouJywgJ2R2LicsICdkcy4nXSxcbiAgICBbJ2RpdW1lbmdlJywgJ2RpbGx1bnMnLCAnZGltYXJ0cycsICdkaW1lY3JlcycsICdkaWpvdXMnLCAnZGl2ZW5kcmVzJywgJ2Rpc3NhYnRlJ10sXG4gICAgWydkZy4nLCAnZGwuJywgJ2R0LicsICdkYy4nLCAnZGouJywgJ2R2LicsICdkcy4nXVxuICBdLFxuICB1LFxuICBbXG4gICAgWydHTicsICdGQicsICdNw4cnLCAnQUInLCAnTUcnLCAnSk4nLCAnSkwnLCAnQUcnLCAnU1QnLCAnT0MnLCAnTlYnLCAnRFMnXSxcbiAgICBbXG4gICAgICAnZGUgZ2VuLicsICdkZSBmZWJyLicsICdkZSBtYXLDpycsICdk4oCZYWJyLicsICdkZSBtYWlnJywgJ2RlIGp1bnknLCAnZGUganVsLicsICdk4oCZYWcuJyxcbiAgICAgICdkZSBzZXQuJywgJ2TigJlvY3QuJywgJ2RlIG5vdi4nLCAnZGUgZGVzLidcbiAgICBdLFxuICAgIFtcbiAgICAgICdkZSBnZW5lcicsICdkZSBmZWJyZXInLCAnZGUgbWFyw6cnLCAnZOKAmWFicmlsJywgJ2RlIG1haWcnLCAnZGUganVueScsICdkZSBqdWxpb2wnLFxuICAgICAgJ2TigJlhZ29zdCcsICdkZSBzZXRlbWJyZScsICdk4oCZb2N0dWJyZScsICdkZSBub3ZlbWJyZScsICdkZSBkZXNlbWJyZSdcbiAgICBdXG4gIF0sXG4gIFtcbiAgICBbJ0dOJywgJ0ZCJywgJ03DhycsICdBQicsICdNRycsICdKTicsICdKTCcsICdBRycsICdTVCcsICdPQycsICdOVicsICdEUyddLFxuICAgIFtcbiAgICAgICdnZW4uJywgJ2ZlYnIuJywgJ21hcsOnJywgJ2Fici4nLCAnbWFpZycsICdqdW55JywgJ2p1bC4nLCAnYWcuJywgJ3NldC4nLCAnb2N0LicsICdub3YuJyxcbiAgICAgICdkZXMuJ1xuICAgIF0sXG4gICAgW1xuICAgICAgJ2dlbmVyJywgJ2ZlYnJlcicsICdtYXLDpycsICdhYnJpbCcsICdtYWlnJywgJ2p1bnknLCAnanVsaW9sJywgJ2Fnb3N0JywgJ3NldGVtYnJlJywgJ29jdHVicmUnLFxuICAgICAgJ25vdmVtYnJlJywgJ2Rlc2VtYnJlJ1xuICAgIF1cbiAgXSxcbiAgW1snYUMnLCAnZEMnXSwgdSwgWydhYmFucyBkZSBDcmlzdCcsICdkZXNwcsOpcyBkZSBDcmlzdCddXSwgMSwgWzYsIDBdLFxuICBbJ2QvTS95eScsICdkIE1NTSB5JywgJ2QgTU1NTSBcXCdkZVxcJyB5JywgJ0VFRUUsIGQgTU1NTSBcXCdkZVxcJyB5J10sXG4gIFsnSDptbScsICdIOm1tOnNzJywgJ0g6bW06c3MgeicsICdIOm1tOnNzIHp6enonXSxcbiAgWyd7MX0gezB9JywgJ3sxfSwgezB9JywgJ3sxfSBcXCdhXFwnIFxcJ2xlc1xcJyB7MH0nLCB1XSxcbiAgWycsJywgJy4nLCAnOycsICclJywgJysnLCAnLScsICdFJywgJ8OXJywgJ+KAsCcsICfiiJ4nLCAnTmFOJywgJzonXSxcbiAgWycjLCMjMC4jIyMnLCAnIywjIzAlJywgJyMsIyMwLjAwwqDCpCcsICcjRTAnXSwgJ+KCrCcsICdldXJvJywge1xuICAgICdBVUQnOiBbJ0FVJCcsICckJ10sXG4gICAgJ0JSTCc6IFt1LCAnUiQnXSxcbiAgICAnQ0FEJzogW3UsICckJ10sXG4gICAgJ0NOWSc6IFsnwqUnXSxcbiAgICAnRVNQJzogWyfigqcnXSxcbiAgICAnSlBZJzogWydKUMKlJywgJ8KlJ10sXG4gICAgJ01YTic6IFt1LCAnJCddLFxuICAgICdUSEInOiBbJ+C4vyddLFxuICAgICdVU0QnOiBbdSwgJyQnXSxcbiAgICAnVkVGJzogW10sXG4gICAgJ1hDRCc6IFt1LCAnJCddXG4gIH0sXG4gIHBsdXJhbFxuXTtcbiJdfQ==