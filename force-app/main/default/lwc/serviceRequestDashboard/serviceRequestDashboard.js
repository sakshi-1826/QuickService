import { LightningElement, wire } from 'lwc';
import getDashboardData from '@salesforce/apex/ServiceRequestDashboardController.getDashboardData';
import { NavigationMixin } from 'lightning/navigation';

export default class ServiceRequestDashboard extends NavigationMixin(LightningElement) {

    total = 0;
    
    closed=0;
    pending = 0;
    data = [];

    columns = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Status', fieldName: 'Status__c' },
        { label: 'Priority', fieldName: 'Priority__c' },
        { label: 'Created Date', fieldName: 'CreatedDate', type: 'date' }
    ];

    @wire(getDashboardData)
    wiredData({ error, data }) {
        if (data) {
            this.total = data.total;
        
            this.closed = data.closed;
            this.pending = data.pending;
            this.data = data.records;
        } else if (error) {
            console.error(error);
        }
    }

    createRecord() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Service_Request__c',
                actionName: 'new'
            }
        });
    }
}