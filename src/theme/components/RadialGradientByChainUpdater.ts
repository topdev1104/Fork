import { useWeb3React } from '@web3-react/core'
import { SupportedChainId } from 'constants/chains'
import { useIsNftPage } from 'hooks/useIsNftPage'
import { useEffect } from 'react'
import { useDarkModeManager } from 'theme/components/ThemeToggle'

import { darkTheme, lightTheme } from '../colors'

const initialStyles = {
  width: '200vw',
  height: '200vh',
  transform: 'translate(-50vw, -100vh)',
}
const backgroundResetStyles = {
  width: '100vw',
  height: '100vh',
  transform: 'unset',
}

type TargetBackgroundStyles = typeof initialStyles | typeof backgroundResetStyles

const backgroundRadialGradientElement = document.getElementById('background-radial-gradient')
const setBackground = (newValues: TargetBackgroundStyles) =>
  Object.entries(newValues).forEach(([key, value]) => {
    if (backgroundRadialGradientElement) {
      backgroundRadialGradientElement.style[key as keyof typeof backgroundResetStyles] = value
    }
  })

export default function RadialGradientByChainUpdater(): null {
  const { chainId } = useWeb3React()
  const [darkMode] = useDarkModeManager()
  const isNftPage = useIsNftPage()

  // manage background color
  useEffect(() => {
    if (!backgroundRadialGradientElement) {
      return
    }

    if (isNftPage) {
      setBackground(initialStyles)
      backgroundRadialGradientElement.style.background = darkMode
        ? darkTheme.backgroundBackdrop
        : lightTheme.backgroundBackdrop
      return
    }

    switch (chainId) {
      case SupportedChainId.ARBITRUM_ONE:
      case SupportedChainId.ARBITRUM_GOERLI: {
        setBackground(backgroundResetStyles)
        const arbitrumLightGradient =
          '#fafafa'
        const arbitrumDarkGradient =
          '#fafafa'
        backgroundRadialGradientElement.style.background = darkMode ? arbitrumDarkGradient : arbitrumLightGradient
        break
      }
      case SupportedChainId.OPTIMISM:
      case SupportedChainId.OPTIMISM_GOERLI: {
        setBackground(backgroundResetStyles)
        const optimismLightGradient =
          '#fafafa'
        const optimismDarkGradient =
          '#fafafa'
        backgroundRadialGradientElement.style.background = darkMode ? optimismDarkGradient : optimismLightGradient
        break
      }
      case SupportedChainId.POLYGON:
      case SupportedChainId.POLYGON_MUMBAI: {
        setBackground(backgroundResetStyles)
        const polygonLightGradient =
          '#fafafa'
        const polygonDarkGradient =
          '#fafafa'
        backgroundRadialGradientElement.style.background = darkMode ? polygonDarkGradient : polygonLightGradient
        break
      }
      case SupportedChainId.CELO:
      case SupportedChainId.CELO_ALFAJORES: {
        setBackground(backgroundResetStyles)
        const celoLightGradient =
          '#fafafa'
        const celoDarkGradient =
          '#fafafa'
        backgroundRadialGradientElement.style.background = darkMode ? celoDarkGradient : celoLightGradient
        break
      }
      case SupportedChainId.BNB: {
        setBackground(backgroundResetStyles)
        const bscLightGradient =
          '#fafafa'
        const bscDarkGradient =
          '#fafafa'
        backgroundRadialGradientElement.style.background = darkMode ? bscDarkGradient : bscLightGradient
        break
      }
      default: {
        setBackground(initialStyles)
        const defaultLightGradient =
          '#fafafa'
        const defaultDarkGradient = '#fafafa'
        backgroundRadialGradientElement.style.background = darkMode ? defaultDarkGradient : defaultLightGradient
      }
    }
  }, [darkMode, chainId, isNftPage])
  return null
}
