<script>
	// FAQ data
	const faqData = {
		title: 'Frequently Asked Questions',
		description: 'Find answers to the most common questions about NoteNow.',
		categories: [
			{
				name: 'General',
				questions: [
					{
						question: 'What is NoteNow?',
						answer:
							"NoteNow is a modern note-taking platform designed to help you capture ideas, organize thoughts, and boost productivity. Our intuitive workspace system lets you manage notes your way, whether you're a student, professional, or creative thinker."
					},
					{
						question: 'How much does NoteNow cost?',
						answer:
							'NoteNow offers a free plan with basic features, as well as premium plans starting at $5.99/month. Visit our pricing page for detailed information about our plans and features.'
					},
					{
						question: 'Is my data secure with NoteNow?',
						answer:
							'Yes! Security is our top priority. All notes are encrypted both in transit and at rest. We use industry-standard security practices to ensure your data remains private and secure.'
					}
				]
			},
			{
				name: 'Features',
				questions: [
					{
						question: 'Can I collaborate with others on notes?',
						answer:
							'Absolutely! NoteNow makes collaboration easy. You can invite team members to your workspaces and control what level of access they have - view only, comment, or edit permissions.'
					},
					{
						question: 'Can I access my notes offline?',
						answer:
							"Yes, NoteNow offers offline access to your notes on our mobile apps. Changes made offline will sync automatically once you're connected to the internet again."
					},
					{
						question: 'Does NoteNow support file attachments?',
						answer:
							'Yes, you can attach images, documents, PDFs, and other file types to your notes, making it easy to keep all related information in one place.'
					}
				]
			},
			{
				name: 'Account',
				questions: [
					{
						question: 'How do I create a NoteNow account?',
						answer:
							"Creating an account is simple! Just click the 'Sign Up' button on the top right of our homepage, enter your email, create a password, and you're ready to go."
					},
					{
						question: 'Can I change my subscription plan later?',
						answer:
							'Yes, you can upgrade, downgrade, or cancel your subscription at any time from your account settings page.'
					},
					{
						question: 'What happens if I cancel my subscription?',
						answer:
							"If you cancel your premium subscription, your account will revert to the free plan at the end of your billing cycle. You'll still have access to your notes, but premium features will no longer be available."
					}
				]
			}
		]
	};
</script>

<div class="container mx-auto px-4 py-8">
	<section class="mb-16 text-center">
		<h1 class="mb-3 text-4xl font-bold md:text-5xl">{faqData.title}</h1>
		<p class="text-xl font-light">{faqData.description}</p>
	</section>

	<section class="mx-auto mb-16 max-w-3xl">
		{#each faqData.categories as category, categoryIndex}
			<div class="mb-10">
				<h2 class="relative mb-6 inline-block text-2xl font-bold">
					{category.name}
				</h2>

				<div class="space-y-4">
					{#each category.questions as faq, questionIndex (categoryIndex + '-' + questionIndex)}
						<div class="bg-base-100 border-base-300 collapse border">
							<!-- Using radio type for accordion behavior where only one item can be open at a time per category -->
							<input
								type="radio"
								name="accordion-{categoryIndex}"
								checked={questionIndex === 0 && categoryIndex === 0}
							/>
							<div class="collapse-title font-semibold">
								{faq.question}
							</div>
							<div class="collapse-content text-sm">
								<p>{faq.answer}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</section>

	<section class="card bg-base-200 mx-auto max-w-2xl rounded-md p-8 text-center">
		<h2 class="mb-4 text-2xl font-bold">Still Have Questions?</h2>
		<p class="mb-6">Can't find the answer you're looking for? Our support team is here to help!</p>
		<a href="mailto:support@notenow.com" class="btn btn-primary rounded-md">Contact Support</a>
	</section>
</div>