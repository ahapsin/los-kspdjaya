<template>
  <div
    class="h-screen flex items-center bg-pr justify-center max-h-screen p-8 md:p-20"
  >
    <div
      class="flex w-full md:w-3/4 h-fit md:h-full bg-white rounded-lg overflow-clip"
    >
      <div class="items-center flex w-full md:w-1/2 p-8 md:p-10 h-full">
        <LoginForm />
      </div>
      <div class="hidden md:flex w-1/2">
        <QuoteSection />
      </div>
    </div>
  </div>
</template>
