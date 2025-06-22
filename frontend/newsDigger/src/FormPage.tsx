import Form from './components/Form'

export default function FormPage(){
    return(
        <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-950">
        {/* Header */}
        <header className="fixed top-0 left-0 w-full p-6">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            NewsDigger
          </h1>
        </header>
        
        {/* Main content centered */}
        <div className="flex min-h-screen w-full items-center justify-center p-4">
        <Form/>
        </div>
        </div> 
    )
}