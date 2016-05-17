const dummyData = {}

    dummyData.transactions  = [
        {
            "amount": 15,
            "description": "Fake Checking Transaction 5",
            "dt_refresh": 1462833579,
            "dt_transaction": 1398920400,
            "id_account": "573a20e62342834f418b48c8",
            "id_account_type": "520d3aa93b8e778e0d000000",
            "id_external": null,
            "id_site": "56cf5728784806f72b8b4568",
            "id_site_organization": "56cf4ff5784806152c8b4567",
            "id_site_organization_type": "56cf4f5b784806cf028b4569",
            "id_transaction": "573a20e62342834f418b48d2",
            "id_user": "573a174e0b212a403e8b459f",
            "is_disable": 0
        },
        {
            "amount": 10,
            "description": "Fake Checking Transaction 4",
            "dt_refresh": 1462833579,
            "dt_transaction": 1412139600,
            "id_account": "573a20e62342834f418b48c8",
            "id_account_type": "520d3aa93b8e778e0d000000",
            "id_external": null,
            "id_site": "56cf5728784806f72b8b4568",
            "id_site_organization": "56cf4ff5784806152c8b4567",
            "id_site_organization_type": "56cf4f5b784806cf028b4569",
            "id_transaction": "573a20e62342834f418b48d3",
            "id_user": "573a174e0b212a403e8b459f",
            "is_disable": 0
        },
        {
            "amount": 10,
            "description": "Fake Checking Transaction 3",
            "dt_refresh": 1462833579,
            "dt_transaction": 1412226000,
            "id_account": "573a20e62342834f418b48c8",
            "id_account_type": "520d3aa93b8e778e0d000000",
            "id_external": null,
            "id_site": "56cf5728784806f72b8b4568",
            "id_site_organization": "56cf4ff5784806152c8b4567",
            "id_site_organization_type": "56cf4f5b784806cf028b4569",
            "id_transaction": "573a20e62342834f418b48d4",
            "id_user": "573a174e0b212a403e8b459f",
            "is_disable": 0
        },
        {
            "amount": 10,
            "description": "Fake Checking Transaction 2",
            "dt_refresh": 1462833579,
            "dt_transaction": 1412312400,
            "id_account": "573a20e62342834f418b48c8",
            "id_account_type": "520d3aa93b8e778e0d000000",
            "id_external": null,
            "id_site": "56cf5728784806f72b8b4568",
            "id_site_organization": "56cf4ff5784806152c8b4567",
            "id_site_organization_type": "56cf4f5b784806cf028b4569",
            "id_transaction": "573a20e62342834f418b48d5",
            "id_user": "573a174e0b212a403e8b459f",
            "is_disable": 0
        },
        {
            "amount": 10,
            "description": "Fake Checking Transaction 1",
            "dt_refresh": 1462833579,
            "dt_transaction": 1412485200,
            "id_account": "573a20e62342834f418b48c8",
            "id_account_type": "520d3aa93b8e778e0d000000",
            "id_external": null,
            "id_site": "56cf5728784806f72b8b4568",
            "id_site_organization": "56cf4ff5784806152c8b4567",
            "id_site_organization_type": "56cf4f5b784806cf028b4569",
            "id_transaction": "573a20e62342834f418b48d6",
            "id_user": "573a174e0b212a403e8b459f",
            "is_disable": 0
        },
        {
            "amount": 10,
            "description": "Fake Checking Transaction 1",
            "dt_refresh": 1462833579,
            "dt_transaction": 1412485200,
            "id_account": "573a20e62342834f418b48c8",
            "id_account_type": "520d3aa93b8e778e0d000000",
            "id_external": null,
            "id_site": "56cf5728784806f72b8b4568",
            "id_site_organization": "56cf4ff5784806152c8b4567",
            "id_site_organization_type": "56cf4f5b784806cf028b4569",
            "id_transaction": "573a20e62342834f418b48d6",
            "id_user": "573a174e0b212a403e8b459f",
            "is_disable": 0
        },
                {
            "amount": 10,
            "description": "Fake Checking Transaction 1",
            "dt_refresh": 1462833579,
            "dt_transaction": 1412485200,
            "id_account": "573a20e62342834f418b48c8",
            "id_account_type": "520d3aa93b8e778e0d000000",
            "id_external": null,
            "id_site": "56cf5728784806f72b8b4568",
            "id_site_organization": "56cf4ff5784806152c8b4567",
            "id_site_organization_type": "56cf4f5b784806cf028b4569",
            "id_transaction": "573a20e62342834f418b48d6",
            "id_user": "573a174e0b212a403e8b459f",
            "is_disable": 0
        }

    ]



	dummyData.accounts = {
		accounts:[
			{
				id_account: "56de2130784806d7028b4589",
				avatar:"/images/52e80c49dacf4353318b4568/avatar",
				name:"banco1",
			},
			{
				id_account: "56cf5728784806f72b8b456b",
				avatar: "/images/5291648bdacf43ee168b4567/avatar",
				name:"bancaza2",

			},

		]
	}




	dummyData.credentials = [
		{
			id_site: "56de2130784806d7028b4589",
			avatar:"/images/52e80c49dacf4353318b4568/avatar",
			name:"banco1",
		},
		{
			id_site: "56cf5728784806f72b8b456b",
			avatar: "/images/5291648bdacf43ee168b4567/avatar",
			name:"bancaza2",

		},

	]

	dummyData.catalogs = [
			{
				id_site:"ewqewq",
				name: "Bancomer",
				credentials:[
					{
			        name: "credential1",
			        type: "text",
			        label: "Credential",
			        required: true,
			        username: true,
			        validation: null
			       },
			      {
			       name: "credential2",
			       type: "password",
			       label: "pass",
			       required: true,
			       username: false,
			       validation: null
			      }
				]
			},
			{
				id_site:"ewqewq",
				name: "Banamex",
				credentials:[
					{
			        name: "credential1",
			        type: "text",
			        label: "Credential",
			        required: true,
			        username: true,
			        validation: null
			       },
			      {
			       name: "credential2",
			       type: "password",
			       label: "pass",
			       required: true,
			       username: false,
			       validation: null
			      }
				]
			},
			{
				id_site:"ewqewq",
				name: "HSBC",
				credentials:[
					{
			        name: "credential1",
			        type: "text",
			        label: "Credential",
			        required: true,
			        username: true,
			        validation: null
			       },
			      {
			       name: "credential2",
			       type: "password",
			       label: "pass",
			       required: true,
			       username: false,
			       validation: null
			      }
				]
			},
			{
				id_site:"ewqewq",
				name: "Santander",
				credentials:[
					{
			        name: "credential1",
			        type: "text",
			        label: "Credential",
			        required: true,
			        username: true,
			        validation: null
			       },
			      {
			       name: "credential2",
			       type: "password",
			       label: "pass",
			       required: true,
			       username: false,
			       validation: null
			      }
				]
			}
	]


export default dummyData;