<template>
	<section class="login-wrap">
		<form @submit.prevent="login" class="login-box">
			<div class="login-pic">
				<img class="w-100" src="../assets/image/loginpic.jpg" />
			</div>
			<div class="d-flex flex-column">
				<label for="myemail"> Email </label>
				<input
					v-model="user.username"
					placeholder="Email"
					id="myemail"
					type="email"
				/>
			</div>
			<div class="d-flex flex-column">
				<label for="mypassword">密碼</label>
				<input
					placeholder="密碼"
					id="mypassword"
					type="password"
					v-model="user.password"
				/>
			</div>
			<button
				@click="login"
				class="btn btn-lg btn-primary w-100 mt-3"
				type="submit"
			>
				登入
			</button>
		</form>
	</section>
</template>
<script>
import ToastMessages from "@/components/ToastMessages.vue";
import { mapActions } from "pinia";
import { useToastMessageStore } from "@/stores/toastMessage";

export default {
	data() {
		return {
			apiUrl: "https://vue3-course-api.hexschool.io/v2",
			user: {
				username: "",
				password: "",
			},
		};
	},
	components: {
		ToastMessages,
	},
	methods: {
		...mapActions(useToastMessageStore, ["pushMessage"]),
		login() {
			const api = `${import.meta.env.VITE_API}admin/signin`;
			this.$http
				.post(api, this.user)
				.then((res) => {
					const { token, expired } = res.data;
					document.cookie = `fabio20token=${token};expires=${new Date(
						expired
					)}; path=/`;
					this.$router.push("/dashbord");
				})
				.catch((error) => {
					this.isLoading = false;
					this.pushMessage({
						style: "danger",
						title: "登入失敗",
						content: error.response.data.message,
					});
				});
		},
	},
};
</script>
