export const messages = {
  en: {
    common: {
      back: 'Back',
      continue: 'Continue',
      retry: 'Retry',
    },
    tabs: {
      discover: 'Discover',
      search: 'Search',
      saved: 'Saved',
      profile: 'Profile',
    },
    onboarding: {
      badge: 'Kosovo food guide',
      title: 'Find your next favorite table.',
      subtitle:
        'A simple start for discovering great restaurants around Kosovo with a polished mobile flow.',
      skip: 'Skip',
      finish: 'Go to auth',
      slides: [
        {
          title: 'Discover restaurants in Kosovo',
          description:
            'Browse local favorites, editorial collections, and city-based discovery flows built for mobile.',
        },
        {
          title: 'Save the places you love',
          description:
            'Bookmark spots worth revisiting and prepare room for personal lists and recommendations.',
        },
        {
          title: 'Search by city, cuisine, or vibe',
          description:
            'Shape search around how people actually decide where to eat, not just by restaurant name.',
        },
      ],
    },
    auth: {
      badge: 'Welcome back',
      signInTitle: 'Your restaurant shortlist starts here.',
      signInSubtitle:
        'Sign in to keep favorites, preferences, and future recommendations in one place.',
      createAccountTitle: 'Create your YummyKosova profile.',
      createAccountSubtitle:
        'Set up the account layer now so future Supabase auth can plug in without reshaping the screens.',
      email: 'Email address',
      emailPlaceholder: 'name@example.com',
      password: 'Password',
      passwordPlaceholder: 'Enter your password',
      fullName: 'Full name',
      fullNamePlaceholder: 'Your name',
      confirmPassword: 'Confirm password',
      confirmPasswordPlaceholder: 'Re-enter your password',
      signInCta: 'Sign in',
      signInPending: 'Signing in...',
      createAccountCta: 'Create account',
      createProfileCta: 'Create profile',
      createProfilePending: 'Creating profile...',
      signOutCta: 'Sign out',
      noAccount: 'Need an account?',
      haveAccount: 'Already registered?',
      serviceNotice:
        'Supabase Auth is wired in. Replace only the surrounding product logic as the app grows.',
      signUpSuccess:
        'Account created. Check your email to confirm the account if confirmation is enabled in Supabase.',
      invalidCredentials: 'Incorrect email or password.',
      emailNotConfirmed: 'Please confirm your email before signing in.',
      userAlreadyRegistered: 'An account with this email already exists.',
      signInErrorFallback: 'We could not sign you in right now.',
      signUpErrorFallback: 'We could not create your account right now.',
      signOutErrorFallback: 'We could not sign you out right now.',
      validationFullNameRequired: 'Full name is required.',
      validationFullNameMin: 'Full name must be at least 2 characters.',
      validationEmailRequired: 'Email is required.',
      validationEmailInvalid: 'Enter a valid email address.',
      validationPasswordRequired: 'Password is required.',
      validationPasswordMin: 'Password must be at least 6 characters.',
      validationConfirmPasswordRequired: 'Please confirm your password.',
      validationPasswordsMatch: 'Passwords do not match.',
    },
    restaurants: {
      discoverTitle: 'Featured picks from across Kosovo',
      discoverSubtitle: 'Browse live restaurant data from Supabase and save places you want to revisit.',
      discoverEmptyTitle: 'No restaurants available yet',
      discoverEmptyDescription: 'Once restaurants are published in Supabase, they will appear here.',
      savedTitle: 'Saved places',
      savedSubtitle: 'Your bookmarks are tied to the signed-in account.',
      savedEmptyTitle: 'No saved places yet',
      savedEmptyDescription: 'Save a restaurant from Discover and it will show up here.',
      saveAction: 'Save',
      savedAction: 'Saved',
      browseAction: 'Browse restaurants',
      loadError: 'We could not load restaurants right now.',
      mutationError: 'We could not update your saved restaurants right now.',
      loadingTitle: 'Loading restaurants',
      loadingMessage: 'Bringing in restaurants and your saved list from Supabase.',
      featuredBadge: 'Featured',
      ratingLabel: 'Rating',
    },
  },
  sq: {
    common: {
      back: 'Mbrapa',
      continue: 'Vazhdo',
      retry: 'Provo sërish',
    },
    tabs: {
      discover: 'Zbulo',
      search: 'Kërko',
      saved: 'Ruajtur',
      profile: 'Profili',
    },
    onboarding: {
      badge: 'Udhëzues gastronomik për Kosovë',
      title: 'Gjej tavolinën tënde të preferuar.',
      subtitle:
        'Një fillim i thjeshtë për të zbuluar restorante në Kosovë me rrjedhë të pastër mobile.',
      skip: 'Kalo',
      finish: 'Vazhdo te hyrja',
      slides: [
        {
          title: 'Zbulo restorante në Kosovë',
          description: 'Shfleto vende lokale, koleksione të kuruara dhe zbulim sipas qytetit.',
        },
        {
          title: 'Ruaji vendet që i do',
          description:
            'Shëno vendet ku dëshiron të kthehesh dhe përgatit hapësirë për lista personale.',
        },
        {
          title: 'Kërko sipas qytetit, kuzhinës ose atmosferës',
          description:
            'Ndërto kërkimin sipas mënyrës si njerëzit zgjedhin ku të hanë.',
        },
      ],
    },
    auth: {
      badge: 'Mirë se u ktheve',
      signInTitle: 'Lista jote e restoranteve fillon këtu.',
      signInSubtitle:
        'Kyçu për të ruajtur favoritët, preferencat dhe rekomandimet e ardhshme.',
      createAccountTitle: 'Krijo profilin tënd në YummyKosova.',
      createAccountSubtitle:
        'Përgatite shtresën e llogarisë tani që Supabase të lidhet pastër më vonë.',
      email: 'Email adresa',
      emailPlaceholder: 'emri@example.com',
      password: 'Fjalëkalimi',
      passwordPlaceholder: 'Shkruaj fjalëkalimin',
      fullName: 'Emri i plotë',
      fullNamePlaceholder: 'Emri yt',
      confirmPassword: 'Konfirmo fjalëkalimin',
      confirmPasswordPlaceholder: 'Shkruaje sërish fjalëkalimin',
      signInCta: 'Kyçu',
      signInPending: 'Duke u kyçur...',
      createAccountCta: 'Krijo llogari',
      createProfileCta: 'Krijo profil',
      createProfilePending: 'Duke krijuar profilin...',
      signOutCta: 'Dil',
      noAccount: 'Nuk ke llogari?',
      haveAccount: 'Ke llogari?',
      serviceNotice:
        'Supabase Auth është i lidhur. Logjika përreth mund të zgjerohet më vonë pa prishur ekranet.',
      signUpSuccess:
        'Llogaria u krijua. Kontrollo emailin për konfirmim nëse ai opsion është aktiv në Supabase.',
      invalidCredentials: 'Emaili ose fjalëkalimi nuk janë të sakta.',
      emailNotConfirmed: 'Konfirmo emailin para se të kyçesh.',
      userAlreadyRegistered: 'Ekziston tashmë një llogari me këtë email.',
      signInErrorFallback: 'Nuk arritëm të të kyçim tani.',
      signUpErrorFallback: 'Nuk arritëm ta krijojmë llogarinë tani.',
      signOutErrorFallback: 'Nuk arritëm të të nxjerrim tani.',
      validationFullNameRequired: 'Emri i plotë është i detyrueshëm.',
      validationFullNameMin: 'Emri i plotë duhet të ketë të paktën 2 shkronja.',
      validationEmailRequired: 'Emaili është i detyrueshëm.',
      validationEmailInvalid: 'Shkruaj një email të vlefshëm.',
      validationPasswordRequired: 'Fjalëkalimi është i detyrueshëm.',
      validationPasswordMin: 'Fjalëkalimi duhet të ketë të paktën 6 karaktere.',
      validationConfirmPasswordRequired: 'Konfirmo fjalëkalimin.',
      validationPasswordsMatch: 'Fjalëkalimet nuk përputhen.',
    },
    restaurants: {
      discoverTitle: 'Zgjedhje të veçuara nga e gjithë Kosova',
      discoverSubtitle: 'Shfleto restorante nga Supabase dhe ruaj vendet ku dëshiron të kthehesh.',
      discoverEmptyTitle: 'Ende nuk ka restorante',
      discoverEmptyDescription: 'Sapo restorantet të publikohen në Supabase, do të shfaqen këtu.',
      savedTitle: 'Vendet e ruajtura',
      savedSubtitle: 'Favoritët lidhen me llogarinë e kyçur.',
      savedEmptyTitle: 'Ende nuk ke ruajtur vende',
      savedEmptyDescription: 'Ruaj një restorant nga Discover dhe do të shfaqet këtu.',
      saveAction: 'Ruaj',
      savedAction: 'Ruajtur',
      browseAction: 'Shfleto restorante',
      loadError: 'Nuk arritëm t’i ngarkojmë restorantet tani.',
      mutationError: 'Nuk arritëm ta përditësojmë listën e ruajtur.',
      loadingTitle: 'Duke ngarkuar restorantet',
      loadingMessage: 'Po sjellim restorantet dhe listën tënde të ruajtur nga Supabase.',
      featuredBadge: 'E veçuar',
      ratingLabel: 'Vlerësimi',
    },
  },
} as const;

export type SupportedLanguage = keyof typeof messages;
export type MessageCatalog = (typeof messages)[SupportedLanguage];
