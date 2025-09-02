<script>
	// App information - customized for NoteNow
	const appInfo = {
		name: 'NoteNow',
		tagline: 'Effortless note-taking for everyone',
		founded: '2023',
		description:
			"NoteNow is a modern note-taking platform designed to help you capture ideas, organize thoughts, and boost productivity. Our intuitive workspace system lets you manage notes your way, whether you're a student, professional, or creative thinker.",
		features: [
			{
				title: 'Smart Workspaces',
				description:
					'Organize notes into dedicated workspaces for different projects or areas of your life.'
			},
			{
				title: 'Collaboration Tools',
				description:
					'Share workspaces and collaborate on notes with teammates, classmates, or friends.'
			},
			{
				title: 'Custom Settings',
				description: 'Personalize your note-taking experience with customizable themes and layouts.'
			},
			{
				title: 'Secure Storage',
				description: 'Your notes are encrypted and securely stored, accessible from any device.'
			}
		],
		team: [
			{
				name: 'Ali Alaa',
				role: 'Founder & CEO',
				bio: 'Passionate about creating tools that enhance productivity and creativity.'
			},
			{
				name: 'Sarah Johnson',
				role: 'Lead Developer',
				bio: 'Full-stack developer with a focus on creating intuitive note-taking experiences.'
			},
			{
				name: 'Michael Chen',
				role: 'Product Designer',
				bio: 'Dedicated to creating simple yet powerful interfaces for note-taking.'
			},
			{
				name: 'Priya Patel',
				role: 'Head of Operations',
				bio: 'Ensuring NoteNow helps users capture and organize their thoughts effectively.'
			}
		]
	};
</script>

<div class="container mx-auto px-4 py-8">
	<section class="mb-16 text-center">
		<h1 class="mb-3 text-4xl font-bold md:text-5xl">{appInfo.name}</h1>
		<p class="text-xl font-light">{appInfo.tagline}</p>
	</section>

	<section class="mb-16">
		<div class="flex flex-col gap-8 md:flex-row">
			<div class="flex-1">
				<h2 class="relative mb-6 inline-block text-3xl font-bold">Our Story</h2>
				<p class="mb-4">{appInfo.description}</p>
				<p>
					Founded in {appInfo.founded}, NoteNow was created with a simple mission: to make capturing
					and organizing your thoughts as effortless as possible. We believe that great ideas
					deserve a great home, and we've built that home with NoteNow.
				</p>
			</div>
			<div class="flex-1">
				<div class="bg-base-200 flex h-[300px] w-full items-center justify-center rounded-md">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-24 w-24 opacity-30"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
						/>
					</svg>
				</div>
			</div>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="relative mb-8 inline-block text-3xl font-bold">What We Offer</h2>
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
			{#each appInfo.features as feature}
				<div class="card bg-base-200 rounded-md shadow-md">
					<div class="card-body">
						<h3 class="card-title mb-2 text-xl">{feature.title}</h3>
						<p>{feature.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<section class="mb-16">
		<h2 class="relative mb-8 inline-block text-3xl font-bold">Meet Our Team</h2>
		<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
			{#each appInfo.team as member}
				<div class="text-center">
					<div class="avatar avatar-placeholder mx-auto mb-4">
						<div class=" bg-base-300 w-24 rounded-md">
							<span class="text-2xl"> {member.name.charAt(0)}</span>
						</div>
					</div>

					<h3 class="mb-1 text-xl font-semibold">{member.name}</h3>
					<p class="mb-3 text-sm font-medium">{member.role}</p>
					<p class="text-sm">{member.bio}</p>
				</div>
			{/each}
		</div>
	</section>

	<section class="card bg-base-200 rounded-md p-8 text-center">
		<h2 class="mb-4 text-3xl font-bold">Get in Touch</h2>
		<p class="mb-6">
			Have questions about NoteNow or want to learn more about our note-taking platform? We'd love
			to hear from you!
		</p>
		<a href="mailto:contact@notenow.com" class="btn btn-primary rounded-md">Contact Us</a>
	</section>
</div>