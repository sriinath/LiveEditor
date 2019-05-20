import fetch from 'node-fetch'
const accessToken = 'dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c'
const getOpportunitiesAPI = 'https://api-staging.aiesec.org/v2/opportunities'
const getBackgroundsAPI = 'https://api-staging.aiesec.org/v2/lists/backgrounds'
const updateOpportunitiesAPI = 'https://api-staging.aiesec.org/v2/opportunities/'

const getOpportunitiesData = () => {
    return Promise.all([
        fetch(`${getOpportunitiesAPI}?access_token=${accessToken}`),
        fetch(`${getBackgroundsAPI}?access_token=${accessToken}`)
    ])
    .then(data => Promise.all(data.map(response => response.json())))
    .then(dataArr => {
      let response: any = {}
      if(dataArr && dataArr.length) {
        if(dataArr[0]) {
          response.opportunitiesData = dataArr[0]
        }
        if(dataArr[1] && dataArr[1].length) {
          response.backgroundsData = dataArr[1]
        }
      }
      if(response && response.opportunitiesData && response.opportunitiesData.data && response.opportunitiesData.data.length) {
        let constructedData = [...response.opportunitiesData.data]
        constructedData.map((data: any) => {
            if(data) {
                if(data.specifics_info && data.specifics_info.salary) {
                    data.salary = data.specifics_info.salary
                }
                if(data.role_info) {
                    if(data.role_info.city) {
                        data.city = data.role_info.city
                    }
                    if(data.role_info.selection_process) {
                        data.selection_process = data.role_info.selection_process
                    }
                }
                if(response.backgroundsData) {
                  data.backgroundsData = response.backgroundsData
                }
            }
        })
        return constructedData
      }
      return []
    })
    .catch(err => console.log(err))
}
const updateOpportunitiesData = (opportunity) => {
  if(opportunity && opportunity.opportunity && opportunity.opportunity.id) {
    const id = opportunity.opportunity.id
    delete opportunity.opportunity.id
    opportunity.access_token = accessToken
    return fetch(updateOpportunitiesAPI + id,
      {
        method: 'patch',
        body: JSON.stringify(opportunity),
        headers: { 'Content-Type': 'application/json' }
      }
    )
    .then(data => data.json())
    .then(response => {
      console.log(response)
      return response
    })
    .catch(err => err)
  }
  else {
    return 'id is mandatory'
  }
}
export {
  getOpportunitiesData,
  updateOpportunitiesData
}