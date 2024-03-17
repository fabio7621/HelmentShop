<template>
	<NavbarVue></NavbarVue>
	<router-view></router-view>
	<FooterVue></FooterVue>
	<ToastMessages></ToastMessages>
</template>

<script>
import NavbarVue from "@/components/Navbar.vue";
import FooterVue from "@/components/Footer.vue";
import ToastMessages from "@/components/ToastMessages.vue";
export default {
	components: {
		NavbarVue,
		FooterVue,
		ToastMessages,
	},
};
</script>

<style></style>
