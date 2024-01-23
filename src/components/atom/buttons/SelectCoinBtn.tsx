import GoldCoinIcn from '@/img/GoldCoinIcn'
import SilverCoinIcn from '@/img/SilverCoinIcn'
import BronzeCoinIcn from '@/img/BronzeCoinIcn'
import * as Styled from './selectcoinbtn.styled'
import Color from '@/style/Color'

interface SelectCoinBtnProps {
  onColorSelected: (color: string) => void
}

function SelectCoinBtn({ onColorSelected }: SelectCoinBtnProps) {
  const handleBtnClick = (color: string) => {
    onColorSelected(color)
  }

  return (
    <>
      <Styled.Swrapper>
        <Styled.Sbutton onClick={() => handleBtnClick(`${Color.cashColor[400]}`)}>
          <GoldCoinIcn />
          <Styled.Stext>금화</Styled.Stext>
        </Styled.Sbutton>
        <Styled.Sbutton onClick={() => handleBtnClick(`${Color.cashColor[500]}`)}>
          <SilverCoinIcn />
          <Styled.Stext>은화</Styled.Stext>
        </Styled.Sbutton>
        <Styled.Sbutton onClick={() => handleBtnClick(`${Color.cashColor[600]}`)}>
          <BronzeCoinIcn />
          <Styled.Stext>동화</Styled.Stext>
        </Styled.Sbutton>
      </Styled.Swrapper>
    </>
  )
}

export default SelectCoinBtn
