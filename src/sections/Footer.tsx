import { LocalTime } from '@/components/LocalTime'
import { ArrowUp } from '@/components/Icons'
import { scrollToTop } from '@/lib/scroll'

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-inner">
        <p>© {new Date().getFullYear()} Siva Thangaraj</p>
        <p>
          Chennai, India — <LocalTime />
        </p>
        <p>Designed &amp; built by Siva</p>
        <button type="button" className="footer-top" onClick={scrollToTop}>
          Back to top <ArrowUp />
        </button>
      </div>
    </footer>
  )
}
