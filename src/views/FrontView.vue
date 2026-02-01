<template>
  <NavbarVue />
  <RouterView />
  <FooterVue />
  <ToastMessages />
</template>

<script setup>
import NavbarVue from "@/components/Navbar.vue";
import FooterVue from "@/components/Footer.vue";
import ToastMessages from "@/components/ToastMessages.vue";
</script>
