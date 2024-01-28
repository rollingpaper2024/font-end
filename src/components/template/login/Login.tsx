import React, { useEffect } from 'react'
import { onClickSocialLogin } from '@/api'
import MainTitle from '@/components/molecule/title/MainTitle'
import { useNavigate } from 'react-router-dom'
import { useAtom } from 'jotai'
import { userAtom } from '@/store/user'
import KakaoLogin from 'react-kakao-login'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  FirebaseError,
} from 'firebase/auth'
import { app } from '@/database'
import { onLoginWithKakao } from '@/api/onClickKakaologin'
import { toast } from 'react-toastify'

function Login() {
  const router = useNavigate()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, setUser] = useAtom(userAtom)

  const kakaoClientId = import.meta.env.VITE_APP_KAKAO_JAVASCRIPT_KEY
  const auth = getAuth(app)
  const kakaoOnFailure = (error: any) => {
    console.log('kakaoOnFailure', error)
  }
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_APP_KAKAO_JAVASCRIPT_KEY)
    }
  }, [])

  const kakaoOnSuccess = async (data: any) => {
    try {
      await createUserWithEmailAndPassword(auth, data.profile.kakao_account.email, data.profile.id)
      toast.success('성공적으로 회원가입이 완료 되었습니다.')
    } catch (error: FirebaseError) {
      console.log(error)
      const errorMessage = error?.message
      console.log('errorMessage', errorMessage)
      if (errorMessage.includes('(auth/email-already-in-use)')) {
        try {
          await signInWithEmailAndPassword(auth, data.profile.kakao_account.email, data.profile.id)
          toast.success('로그인이 완료 되었습니다.')
        } catch (loginError) {
          console.log(loginError)
          // 추가적인 오류 처리
        }
      }
    }
  }

  useEffect(() => {
    if (user.uid && user.uid !== 'no-user') {
      router(`/main/${user.uid}`)
    }
  }, [user, router])

  const handleSocialLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const result = await onClickSocialLogin(e)
    if (result === false) {
      console.log('테스트', user)
      console.log('Login failed', result)
    }
  }
  return (
    <>
      <MainTitle title="회원가입 하기" desc="소셜 로그인 및 이메일로 간편 가입할 수 있어요." />
      <button name="google" onClick={handleSocialLogin}>
        google
      </button>
      <KakaoLogin
        name="kakao"
        onClick={onLoginWithKakao}
        token={kakaoClientId}
        onSuccess={kakaoOnSuccess}
        onFail={kakaoOnFailure}
      />
    </>
  )
}

export default Login
