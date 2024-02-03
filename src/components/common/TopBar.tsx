import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';
import AutoCompleteSearchInput from './AutoCompleteSearchInput';

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
}));

const TopBar = () => {
  // TODO: API
  const autocompleteOptions: any = [
    {
      title: 'fake',
      id: '0',
    },
  ];
  const onSearchInputChange = () => {
    console.log('input');
  };
  const onClickOption = () => {
    console.log('click');
  };
  return (
    <StyledTopBarContainer>
      <AutoCompleteSearchInput autocompleteOptions={autocompleteOptions} onSearchInputChange={onSearchInputChange} onClickOption={onClickOption} />
    </StyledTopBarContainer>
  );
};

export default TopBar;
