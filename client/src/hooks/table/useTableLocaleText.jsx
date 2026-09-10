import useLang from '../i18n/useLang';

const useTableLocaleText = () => {
    const { t } = useLang('table');

    return {
        noRowsLabel: t('noRowsLabel'),
        noResultsOverlayLabel: t('noResultsOverlayLabel'),
        noColumnsOverlayLabel: t('noColumnsOverlayLabel'),
        noColumnsOverlayManageColumns: t('noColumnsOverlayManageColumns'),
        emptyPivotOverlayLabel: t('emptyPivotOverlayLabel'),
        toolbarDensity: t('toolbarDensity'),
        toolbarDensityLabel: t('toolbarDensityLabel'),
        toolbarDensityCompact: t('toolbarDensityCompact'),
        toolbarDensityStandard: t('toolbarDensityStandard'),
        toolbarDensityComfortable: t('toolbarDensityComfortable'),
        toolbarColumns: t('toolbarColumns'),
        toolbarColumnsLabel: t('toolbarColumnsLabel'),
        toolbarFilters: t('filters'),
        toolbarFiltersLabel: t('showFilters'),
        toolbarFiltersTooltipHide: t('hideFilters'),
        toolbarFiltersTooltipShow: t('showFilters'),
        toolbarFiltersTooltipActive: (count) =>
            count !== 1 ? `${count} ${t('activeFilters')}` : `${count} ${t('activeFilter')}`,
        toolbarQuickFilterPlaceholder: t('toolbarQuickFilterPlaceholder'),
        toolbarQuickFilterLabel: t('toolbarQuickFilterLabel'),
        toolbarQuickFilterDeleteIconLabel: t('toolbarQuickFilterDeleteIconLabel'),
        toolbarExport: t('toolbarExport'),
        toolbarExportLabel: t('toolbarExportLabel'),
        toolbarExportCSV: t('toolbarExportCSV'),
        toolbarExportPrint: t('toolbarExportPrint'),
        toolbarExportExcel: t('toolbarExportExcel'),
        toolbarPivot: t('toolbarPivot'),
        toolbarAssistant: t('toolbarAssistant'),
        columnsManagementSearchTitle: t('columnsManagementSearchTitle'),
        columnsManagementNoColumns: t('columnsManagementNoColumns'),
        columnsManagementShowHideAllText: t('columnsManagementShowHideAllText'),
        columnsManagementReset: t('columnsManagementReset'),
        columnsManagementDeleteIconLabel: t('columnsManagementDeleteIconLabel'),
        filterPanelAddFilter: t('filterPanelAddFilter'),
        filterPanelRemoveAll: t('filterPanelRemoveAll'),
        filterPanelDeleteIconLabel: t('filterPanelDeleteIconLabel'),
        filterPanelLogicOperator: t('filterPanelLogicOperator'),
        filterPanelOperator: t('filterPanelOperator'),
        filterPanelOperatorAnd: t('filterPanelOperatorAnd'),
        filterPanelOperatorOr: t('filterPanelOperatorOr'),
        filterPanelColumns: t('filterPanelColumns'),
        filterPanelInputLabel: t('filterPanelInputLabel'),
        filterPanelInputPlaceholder: t('filterPanelInputPlaceholder'),
        headerFilterOperatorContains: t('headerFilterOperatorContains'),
        headerFilterOperatorDoesNotContain: t('headerFilterOperatorDoesNotContain'),
        headerFilterOperatorEquals: t('headerFilterOperatorEquals'),
        headerFilterOperatorDoesNotEqual: t('headerFilterOperatorDoesNotEqual'),
        headerFilterOperatorStartsWith: t('headerFilterOperatorStartsWith'),
        headerFilterOperatorEndsWith: t('headerFilterOperatorEndsWith'),
        headerFilterOperatorIs: t('headerFilterOperatorIs'),
        headerFilterOperatorNot: t('headerFilterOperatorNot'),
        headerFilterOperatorAfter: t('headerFilterOperatorAfter'),
        headerFilterOperatorOnOrAfter: t('headerFilterOperatorOnOrAfter'),
        headerFilterOperatorBefore: t('headerFilterOperatorBefore'),
        headerFilterOperatorOnOrBefore: t('headerFilterOperatorOnOrBefore'),
        headerFilterOperatorIsEmpty: t('headerFilterOperatorIsEmpty'),
        headerFilterOperatorIsNotEmpty: t('headerFilterOperatorIsNotEmpty'),
        headerFilterOperatorIsAnyOf: t('headerFilterOperatorIsAnyOf'),
        'headerFilterOperator=': t('headerFilterOperatorEqualSymbol'),
        'headerFilterOperator!=': t('headerFilterOperatorNotEqualSymbol'),
        'headerFilterOperator>': t('headerFilterOperatorGreaterThan'),
        'headerFilterOperator>=': t('headerFilterOperatorGreaterThanOrEqual'),
        'headerFilterOperator<': t('headerFilterOperatorLessThan'),
        'headerFilterOperator<=': t('headerFilterOperatorLessThanOrEqual'),
        headerFilterClear: t('headerFilterClear'),
        filterValueAny: t('filterValueAny'),
        filterValueTrue: t('filterValueTrue'),
        filterValueFalse: t('filterValueFalse'),
        columnMenuLabel: t('columnMenuLabel'),
        columnMenuAriaLabel: (columnName) => `${columnName} ${t('columnMenu')}`,
        columnMenuShowColumns: t('columnMenuShowColumns'),
        columnMenuManageColumns: t('columnMenuManageColumns'),
        columnMenuFilter: t('columnMenuFilter'),
        columnMenuHideColumn: t('columnMenuHideColumn'),
        columnMenuUnsort: t('columnMenuUnsort'),
        columnMenuSortAsc: t('columnMenuSortAsc'),
        columnMenuSortDesc: t('columnMenuSortDesc'),
        columnMenuManagePivot: t('columnMenuManagePivot'),
        columnHeaderFiltersTooltipActive: (count) =>
            count !== 1 ? `${count} ${t('activeFilters')}` : `${count} ${t('activeFilter')}`,
        columnHeaderFiltersLabel: t('columnHeaderFiltersLabel'),
        columnHeaderSortIconLabel: t('columnHeaderSortIconLabel'),
        footerRowSelected: (count) =>
            count !== 1
                ? `${count.toLocaleString()} ${t('rowsSelected')}`
                : `${count.toLocaleString()} ${t('rowSelected')}`,
        footerTotalRows: t('footerTotalRows'),
        footerTotalVisibleRows: (visibleCount, totalCount) =>
            `${visibleCount.toLocaleString()} ${t('of')} ${totalCount.toLocaleString()}`,
        booleanCellTrueLabel: t('booleanCellTrueLabel'),
        booleanCellFalseLabel: t('booleanCellFalseLabel'),
        actionsCellMore: t('actionsCellMore'),
        pinToLeft: t('pinToLeft'),
        pinToRight: t('pinToRight'),
        unpin: t('unpin'),
        treeDataGroupingHeaderName: t('treeDataGroupingHeaderName'),
        treeDataExpand: t('treeDataExpand'),
        treeDataCollapse: t('treeDataCollapse'),
        groupingColumnHeaderName: t('groupingColumnHeaderName'),
        groupColumn: (name) => `${t('groupBy')} ${name}`,
        unGroupColumn: (name) => `${t('stopGroupingBy')} ${name}`,
        detailPanelToggle: t('detailPanelToggle'),
        expandDetailPanel: t('expandDetailPanel'),
        collapseDetailPanel: t('collapseDetailPanel'),
        paginationRowsPerPage: t('paginationRowsPerPage'),
        paginationDisplayedRows: ({ from, to, count, estimated }) => {
            if (!estimated) {
                return `${from}–${to} ${t('of')} ${count !== -1 ? count : `${t('moreThan')} ${to}`}`;
            }
            const estimatedLabel =
                estimated && estimated > to
                    ? `${t('around')} ${estimated}`
                    : `${t('moreThan')} ${to}`;
            return `${from}–${to} ${t('of')} ${count !== -1 ? count : estimatedLabel}`;
        },
        paginationItemAriaLabel: (type) => {
            if (type === 'first') {
                return t('goFirstPage');
            }
            if (type === 'last') {
                return t('goLastPage');
            }
            if (type === 'next') {
                return t('goNextPage');
            }
            return t('goPreviousPage');
        },
        rowReorderingHeaderName: t('rowReorderingHeaderName'),
        aggregationMenuItemHeader: t('aggregationMenuItemHeader'),
        aggregationFunctionLabelSum: t('aggregationFunctionLabelSum'),
        aggregationFunctionLabelAvg: t('aggregationFunctionLabelAvg'),
        aggregationFunctionLabelMin: t('aggregationFunctionLabelMin'),
        aggregationFunctionLabelMax: t('aggregationFunctionLabelMax'),
        aggregationFunctionLabelSize: t('aggregationFunctionLabelSize'),
        pivotToggleLabel: t('pivotToggleLabel'),
        pivotRows: t('pivotRows'),
        pivotColumns: t('pivotColumns'),
        pivotValues: t('pivotValues'),
        pivotCloseButton: t('pivotCloseButton'),
        pivotSearchButton: t('pivotSearchButton'),
        pivotSearchControlPlaceholder: t('pivotSearchControlPlaceholder'),
        pivotSearchControlLabel: t('pivotSearchControlLabel'),
        pivotSearchControlClear: t('pivotSearchControlClear'),
        pivotNoFields: t('pivotNoFields'),
        pivotMenuMoveUp: t('pivotMenuMoveUp'),
        pivotMenuMoveDown: t('pivotMenuMoveDown'),
        pivotMenuMoveToTop: t('pivotMenuMoveToTop'),
        pivotMenuMoveToBottom: t('pivotMenuMoveToBottom'),
        pivotMenuRows: t('pivotMenuRows'),
        pivotMenuColumns: t('pivotMenuColumns'),
        pivotMenuValues: t('pivotMenuValues'),
        pivotMenuOptions: t('pivotMenuOptions'),
        pivotMenuAddToRows: t('pivotMenuAddToRows'),
        pivotMenuAddToColumns: t('pivotMenuAddToColumns'),
        pivotMenuAddToValues: t('pivotMenuAddToValues'),
        pivotMenuRemove: t('pivotMenuRemove'),
        pivotDragToRows: t('pivotDragToRows'),
        pivotDragToColumns: t('pivotDragToColumns'),
        pivotDragToValues: t('pivotDragToValues'),
        pivotYearColumnHeaderName: t('pivotYearColumnHeaderName'),
        pivotQuarterColumnHeaderName: t('pivotQuarterColumnHeaderName'),
        aiAssistantPanelTitle: t('aiAssistantPanelTitle'),
        aiAssistantPanelClose: t('aiAssistantPanelClose'),
        aiAssistantPanelNewConversation: t('aiAssistantPanelNewConversation'),
        aiAssistantPanelConversationHistory: t('aiAssistantPanelConversationHistory'),
        aiAssistantPanelEmptyConversation: t('aiAssistantPanelEmptyConversation'),
        aiAssistantSuggestions: t('aiAssistantSuggestions'),
        promptFieldLabel: t('promptFieldLabel'),
        promptFieldPlaceholder: t('promptFieldPlaceholder'),
        promptFieldPlaceholderWithRecording: t('promptFieldPlaceholderWithRecording'),
        promptFieldPlaceholderListening: t('promptFieldPlaceholderListening'),
        promptFieldSpeechRecognitionNotSupported: t('promptFieldSpeechRecognitionNotSupported'),
        promptFieldSend: t('promptFieldSend'),
        promptFieldRecord: t('promptFieldRecord'),
        promptFieldStopRecording: t('promptFieldStopRecording'),
        promptRerun: t('promptRerun'),
        promptProcessing: t('promptProcessing'),
        promptAppliedChanges: t('promptAppliedChanges'),
        promptChangeGroupDescription: (column) => `${t('groupBy')} ${column}`,
        promptChangeAggregationLabel: (column, aggregation) => `${column} (${aggregation})`,
        promptChangeAggregationDescription: (column, aggregation) =>
            `${t('aggregate')} ${column} (${aggregation})`,
        promptChangeFilterLabel: (column, operator, value) => {
            if (operator === 'is any of') {
                return `${column} ${t('isAnyOfPrompt')}: ${value}`;
            }
            return `${column} ${operator} ${value}`;
        },
        promptChangeFilterDescription: (column, operator, value) => {
            if (operator === 'is any of') {
                return `${t('filterWhere')} ${column} ${t('isAnyOfPrompt')}: ${value}`;
            }
            return `${t('filterWhere')} ${column} ${operator} ${value}`;
        },
        promptChangeSortDescription: (column, direction) =>
            `${t('sortBy')} ${column} (${direction})`,
        promptChangePivotEnableLabel: t('pivot'),
        promptChangePivotEnableDescription: t('enablePivot'),
        promptChangePivotColumnsLabel: (count) => `${t('columns')} (${count})`,
        promptChangePivotColumnsDescription: (column, direction) =>
            `${column}${direction ? ` (${direction})` : ''}`,
        promptChangePivotRowsLabel: (count) => `${t('rows')} (${count})`,
        promptChangePivotValuesLabel: (count) => `${t('values')} (${count})`,
        promptChangePivotValuesDescription: (column, aggregation) => `${column} (${aggregation})`,
        filterOperatorContains: t('filterOperatorContains'),
        filterOperatorDoesNotContain: t('filterOperatorDoesNotContain'),
        filterOperatorEquals: t('filterOperatorEquals'),
        filterOperatorDoesNotEqual: t('filterOperatorDoesNotEqual'),
        filterOperatorStartsWith: t('filterOperatorStartsWith'),
        filterOperatorEndsWith: t('filterOperatorEndsWith'),
        filterOperatorIs: t('filterOperatorIs'),
        filterOperatorNot: t('filterOperatorNot'),
        filterOperatorAfter: t('filterOperatorAfter'),
        filterOperatorOnOrAfter: t('filterOperatorOnOrAfter'),
        filterOperatorBefore: t('filterOperatorBefore'),
        filterOperatorOnOrBefore: t('filterOperatorOnOrBefore'),
        filterOperatorIsEmpty: t('filterOperatorIsEmpty'),
        filterOperatorIsNotEmpty: t('filterOperatorIsNotEmpty'),
        filterOperatorIsAnyOf: t('filterOperatorIsAnyOf'),
        checkboxSelectionHeaderName: t('checkboxSelectionHeaderName'),
        checkboxSelectionSelectAllRows: t('checkboxSelectionSelectAllRows'),
        checkboxSelectionUnselectAllRows: t('checkboxSelectionUnselectAllRows'),
        checkboxSelectionSelectRow: t('checkboxSelectionSelectRow'),
        checkboxSelectionUnselectRow: t('checkboxSelectionUnselectRow'),
    };
};

export default useTableLocaleText;
