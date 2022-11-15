import Script from 'next/script'

function GAScript() {
  const GA_KEY = 'G-NJTLY0DRN3'
  return (
    <div>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_KEY}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GA_KEY}');
        `}
      </Script>
    </div>
  )
}

export default GAScript
