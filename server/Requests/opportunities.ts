import fetch from 'node-fetch'
import console = require('console');

const getOpportunitiesData = () => {
    return fetch('https://api-staging.aiesec.org/v2/opportunities?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c')
    .then(data => data.json())
    .then(response => {
      if(response && response.data && response.data.length) {
        let constructedData = [...response.data]
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
    opportunity.access_token = 'dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c'
    return fetch('https://api-staging.aiesec.org/v2/opportunities/' + id,
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