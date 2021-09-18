const users = {
    benjaminRR: {
        handle: "benjaminRR",
        displayName: "benjamin",
        avatarSrc: "/assets/benjaminRR-avatar.jpg",
        bannerSrc: "/assets/benjaminRR-banner.jpg",
        // ... and a lot more goes inside this body of user.
        locations: 8,           // # places caputures have been done by user.
        captures: 14,           // # of user's captures.
        verifiedGiven: 452,     // # user has verified other user captures.
        refutesGiven: 72,       // # user has refuted other user captures.
        documationGiven: 2,     // # user has given documentation on a creature.
        achievement: {
            TheInspector: false, // verify 5000 user captures.
            // fill this in with more acheivements
        },
        friends: {
            friendList: [              // user's friend list.
                user2,
                user3,
            ],
            directMessages: {
                12099071237: {
                    conversationId: '12099071237',
                    participants: [users.benjaminRR, users.user2, users.user3], // every participant gets this conversation saved in their directMessages Object.
                    messages: [
                    {
                        id: 'a',        // change this to be a timestamp + unique#.
                        user: users.benjaminRR,
                        body: "Hey guys, did you see that unicorn someone posted in Turkey?",
                        timestamp: "5:54",
                    },
                    {
                        id: 'b',
                        user: users.user2,
                        body: "yeah, obviously fake.",
                        timestamp: "5:57",
                    },
                    {
                        id: 'c',
                        user: users.benjaminRR,
                        body: "yeah I know, but it's got like 10000 stars overnight. it's insane.",
                        timestamp: "5:57:",
                    },
                    {
                        id: 'd',
                        user: users.user3,
                        body: "I saw an article from a scientist trying to prove it was real. fn stupid.",
                        timestamp: "5:57",
                    }
                    ],
                },

                

            }

        },


    },
    user2: {
        // fill this in.
    },
    user3: {
        // fill this in.
    }
};

const caputres = {
    "20210906": {   // unique id for captures are currently year/month/day (needs to fix how Id is created.)
        id: "20210906", // this should be the same as line above.
        authorHandle: "benjaminRR",
        timestamp: "2021-09-06T09:49:04-04:00", // default momet format.
        location: {
            lat: 213,
            lng: 1234,
        },
        region: "fill this in",                 // region of capture.
        captureSrc: "",
        verified: false,                        // parameter used for many things in app.
        verifications: 42,                      // it is what the author says it is. (rated by other users)
        refutes: 8,                             // is not what the author says it is. (rated by other users)
        stars: 4.2,                             // ratings are 0 - 5 stars.
        documentation: "",                      // writing of creature captured (or not captured?)
        creature: {
            type: "pet",                        // type is to help define ads.
            rarity: 7,
            endangered: false,
        },
    },
    "20210906-2": {
        // fill this in
    },
};

const animals = {

}

module.export = {
    users,
    captures,
}