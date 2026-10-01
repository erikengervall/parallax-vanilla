// Entry for the <script> tag build: exposes the API as `window.pv`
import './parallax-vanilla.css'
import pv from './index'

declare global {
  interface Window {
    pv?: typeof pv
  }
}

if (typeof window !== 'undefined' && !window.pv) window.pv = pv
