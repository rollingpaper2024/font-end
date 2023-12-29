import color from '../../../style/color'
import styled from 'styled-components'
import font from '../../../style/font'

export const SBtn = styled.button<{ $isDisabled: boolean }>`
  background-color: ${(props) => (props.$isDisabled ? color.gray[500] : color.gray[600])};
  height: 56px;
  width: 80%;
  color: ${color.yellow[300]}};
  font-size: ${font.Small};
  border: 2px solid ${color.gray[600]};

  // 버튼이 비활성화 상태가 아닐 때 hover 및 active 스타일 적용
  &:hover {
    background-color: ${(props) => (!props.$isDisabled ? color.gray[800] : color.gray[500])};
  }

  &:active {
    background-color: ${(props) => (!props.$isDisabled ? color.gray[800] : color.gray[500])};
  }
`
export const RightBtn = styled.div`
  position: relative;
  left: 88.2%;
  top: -56px;
`

export const BtnText = styled.div`
  text-align: center;
  position: relative;
  top: -92px;
`
