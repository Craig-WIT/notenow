<script>
	// Pricing data
	const pricingData = {
		title: 'Simple, Transparent Pricing',
		description: "Choose the plan that's right for you.",
		plans: [
			{
				name: 'Free',
				price: '$0',
				period: 'forever',
				description: 'Perfect for getting started',
				features: [
					{ name: 'Up to 50 notes', included: true },
					{ name: 'Basic organization', included: true },
					{ name: '5 workspaces', included: true },
					{ name: 'Mobile access', included: true },
					{ name: 'Collaboration with 1 user', included: true },
					{ name: 'Advanced organization', included: false },
					{ name: 'Priority support', included: false },
					{ name: 'Unlimited file attachments', included: false }
				],
				cta: 'Get Started',
				ctaLink: '/auth/signup',
				popular: false
			},
			{
				name: 'Pro',
				price: '$5.99',
				period: 'per month',
				description: 'Everything you need for personal productivity',
				features: [
					{ name: 'Unlimited notes', included: true },
					{ name: 'Advanced organization', included: true },
					{ name: 'Unlimited workspaces', included: true },
					{ name: 'Mobile access', included: true },
					{ name: 'Collaboration with 5 users', included: true },
					{ name: 'Version history', included: true },
					{ name: 'Priority support', included: true },
					{ name: '5GB file attachments', included: true }
				],
				cta: 'Start Free Trial',
				ctaLink: '/auth/signup?plan=pro',
				popular: true
			},
			{
				name: 'Team',
				price: '$12.99',
				period: 'per user/month',
				description: 'Advanced features for teams',
				features: [
					{ name: 'Everything in Pro', included: true },
					{ name: 'Admin dashboard', included: true },
					{ name: 'Team workspaces', included: true },
					{ name: 'Advanced permissions', included: true },
					{ name: 'Unlimited collaborators', included: true },
					{ name: 'Audit logs', included: true },
					{ name: '24/7 priority support', included: true },
					{ name: 'Unlimited file attachments', included: true }
				],
				cta: 'Contact Sales',
				ctaLink: 'mailto:sales@notenow.com',
				popular: false
			}
		],
		faq: [
			{
				question: 'Can I change plans later?',
				answer:
					'Yes, you can upgrade, downgrade, or cancel your subscription at any time from your account settings.'
			},
			{
				question: 'Is there a free trial?',
				answer:
					'Yes! We offer a 14-day free trial of our Pro and Team plans. No credit card required to start.'
			},
			{
				question: 'What payment methods do you accept?',
				answer: 'We accept all major credit cards, PayPal, and Apple Pay.'
			},
			{
				question: 'Do you offer discounts for education or non-profits?',
				answer:
					'Yes, we offer special pricing for educational institutions and non-profit organizations. Please contact our sales team for more information.'
			}
		]
	};
</script>

<div class="container mx-auto px-4 py-8">
	<section class="mb-16 text-center">
		<h1 class="mb-3 text-4xl font-bold md:text-5xl">{pricingData.title}</h1>
		<p class="text-xl font-light">{pricingData.description}</p>
	</section>

	<section class="mb-20">
		<div class="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
			{#each pricingData.plans as plan, index}
				<div
					class="card bg-base-100 border-base-200 overflow-hidden rounded-md border shadow-md {plan.popular
						? 'relative'
						: ''}"
				>
					{#if plan.popular}
						<div
							class="bg-primary text-primary-content absolute top-0 right-0 rounded-bl-md px-3 py-1 text-sm font-medium"
						>
							Most Popular
						</div>
					{/if}

					<div class="card-body p-6">
						<h2 class="mb-1 text-2xl font-bold">{plan.name}</h2>
						<div class="mb-4">
							<span class="text-3xl font-bold">{plan.price}</span>
							<span>/{plan.period}</span>
						</div>
						<p class="mb-6">{plan.description}</p>

						<div class="flex-grow">
							<ul class="mb-8 space-y-3">
								{#each plan.features as feature}
									<li class="flex items-start">
										{#if feature.included}
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="text-success mt-0.5 mr-2 h-5 w-5"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M5 13l4 4L19 7"
												/>
											</svg>
										{:else}
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="mt-0.5 mr-2 h-5 w-5"
												fill="none"
												viewBox="0 24 24"
												stroke="currentColor"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M6 18L18 6M6 6l12 12"
												/>
											</svg>
										{/if}
										<span>{feature.name}</span>
									</li>
								{/each}
							</ul>
						</div>

						<div class="card-actions">
							<a
								href={plan.ctaLink}
								class="btn {plan.popular ? 'btn-primary' : 'btn-outline'} w-full rounded-md"
							>
								{plan.cta}
							</a>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<section class="mx-auto mb-16 max-w-3xl">
		<h2 class="mb-8 text-center text-3xl font-bold">Frequently Asked Questions</h2>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			{#each pricingData.faq as faq}
				<div class="card bg-base-200 rounded-md shadow-sm">
					<div class="card-body">
						<h3 class="card-title text-lg">{faq.question}</h3>
						<p>{faq.answer}</p>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<section class="card bg-base-200 mx-auto max-w-3xl rounded-md p-8 text-center">
		<h2 class="mb-4 text-2xl font-bold">Need a Custom Plan?</h2>
		<p class="mb-6">
			We offer custom solutions for large teams and enterprises. Contact our sales team to discuss
			your specific requirements.
		</p>
		<a href="mailto:enterprise@notenow.com" class="btn btn-primary rounded-md"
			>Contact Enterprise Sales</a
		>
	</section>
</div>