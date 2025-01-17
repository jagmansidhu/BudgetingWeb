package org.example.javaproject1.transaction;

public class SummaryData {
    private String month;
    private double totalAmount;

    // Constructor, getters, and setters
    public SummaryData(String month, double totalAmount) {
        this.month = month;
        this.totalAmount = totalAmount;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }
}

