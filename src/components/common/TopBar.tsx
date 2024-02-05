import { useEffect } from 'react';
import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';
import AutoCompleteSearchInput from './AutoCompleteSearchInput';
import useStockListData from '../../utils/useStockListData';
import { useStockInfoDataContext, IStockInfoDataContextValue } from '../../provider/StockInfoDataProvider';

const StyledTopBarContainer = styled('div', {
  shouldForwardProp: (prop) => isPropValid(prop),
})(({ theme }: any) => ({
  height: theme.spacing(8),
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: theme.shadows[1],
  position: 'fixed',
  backgroundColor: theme.customColors.white,
  zIndex: 100,
}));

const TopBar = () => {
  const { handleStockInfoChange } = useStockInfoDataContext() as IStockInfoDataContextValue;
  const {
    getAllStockList,
    allFormattedStockList,
    filterStockData,
  } = useStockListData();
  const onSearchInputChange = (_: any, value: string) => {
    filterStockData(value);
  };
  const onClickOption = (_: any, value: any) => {
    if (value) {
      handleStockInfoChange({ currentSelectedStockId: value.id, currentSelectedStockName: value.name });
    }
  };

  useEffect(() => {
    getAllStockList();
  }, [getAllStockList]);

  return (
    <StyledTopBarContainer>
      <AutoCompleteSearchInput autocompleteOptions={allFormattedStockList} onSearchInputChange={onSearchInputChange} onClickOption={onClickOption} />
    </StyledTopBarContainer>
  );
};

export default TopBar;
