<template>
  <div class="absolute w-full h-full">
    <div class="flex h-[4rem] border-b">
      <n-page-header
        class="w-full sticky bg-white border-b top-0 z-50 backdrop-blur p-2"
      >
        <template #title>
          <n-space align="center">
            <n-button strong circle @click="activate('left')">
              <template #icon>
                <n-icon><menu-icon /></n-icon>
              </template>
            </n-button>
            <img
              class="h-14 md:h-12"
              :src="applogo"
              alt="logo_company"
            />
            {{apptitle}}
          </n-space>
          <span class="hidden md:flex capitalize"></span>
        </template>
        <template #extra>
          <account-avatar />
        </template>
      </n-page-header>
    </div>
    <div class="flex h-[calc(100%-4rem)] overflow-auto">body</div>
  </div>
</template>
