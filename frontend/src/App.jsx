import { useEffect, useState } from 'react'
import Navbar from './components/blocks/Navbar/Navbar'
import Hero from './components/blocks/Hero/Hero'
import Services from './components/blocks/Services/Services'
import Opportunities from './components/blocks/Opportunities/Opportunities'
import About from './components/blocks/About/About'
import Cta from './components/blocks/Cta/Cta'
import Cases from './components/blocks/Cases/Cases'
import LeadForm from './components/blocks/LeadForm/LeadForm'
import Faq from './components/blocks/Faq/Faq'
import Stats from './components/blocks/Stats/Stats'
import Solution from './components/blocks/Solution/Solution'
import SolutionSteps from './components/blocks/SolutionSteps/SolutionSteps'
import Footer from './components/blocks/Footer/Footer'
import { fetchPublicContent } from './utils/api'


function App() {
  const [cmsContent, setCmsContent] = useState(null)

  useEffect(() => {
    let isCancelled = false

    fetchPublicContent()
      .then((payload) => {
        if (!isCancelled) {
          setCmsContent(payload)
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setCmsContent(null)
        }
      })

    return () => {
      isCancelled = true
    }
  }, [])

  return (
    <>
      <Navbar />
      <Hero snippets={cmsContent?.snippets} calculatorQuestionsData={cmsContent?.calculator} />
      <Stats statsData={cmsContent?.stats} />
      <Solution />
      <SolutionSteps />
      <Opportunities />
      <About snippets={cmsContent?.snippets} />
      <Services />
      <Cta snippets={cmsContent?.snippets} />
      <Cases casesItems={cmsContent?.cases} />
      <LeadForm snippets={cmsContent?.snippets} />
      <Faq faqItems={cmsContent?.faq} snippets={cmsContent?.snippets} />
      <Footer />

    </>
  )
}

export default App
