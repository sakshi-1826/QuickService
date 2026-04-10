public with sharing class ServiceRequestDashboardController {

    @AuraEnabled(cacheable=true)
    public static Map<String, Object> getDashboardData() {

        Map<String, Object> result = new Map<String, Object>();

        // Counts
        Integer total = [SELECT COUNT() FROM Service_Request__c];
       
        Integer closed = [SELECT COUNT() FROM Service_Request__c WHERE Status__c = 'Closed'];
        Integer pending = total - closed ;

        // Records for datatable
        List<Service_Request__c> requests = [
            SELECT Id, Name, Status__c, Priority__c, CreatedDate
            FROM Service_Request__c
            ORDER BY CreatedDate DESC
            LIMIT 10
        ];

        result.put('total', total);
    
        result.put('closed', closed);
        result.put('pending', pending);
        result.put('records', requests);

        return result;
    }
}